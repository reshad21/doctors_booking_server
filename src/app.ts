/* eslint-disable no-console */
import express, { Application } from 'express';
import cors from 'cors';
import config from './app/configs';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFoundErrorHandler from './app/middlewares/notFoundErrorHandler';
import { createDoctor } from './app/SeedUser/SeedUser';
import http from 'http';
import { Server } from 'socket.io';
import { seedMedicines } from './app/seed/seedMedicines';

// Initialize the express application
const app: Application = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:5173',
  'http://62.72.12.193',
  'http://145.223.23.4',
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS (Socket.IO)'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  },
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Export io so services (like PatientService) can emit events
export { io };

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS (Express)'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  }),
);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Backend in Doctors portal!',
  });
});

// Importing routes
app.use('/api/v1', router);

// Error handling middleware
app.use(globalErrorHandler);

// 404 Not Found middleware
app.use(notFoundErrorHandler);

// Running the server
server.listen(config.PORT, async () => {
  console.log(`🚀 Server is running on port ${config.PORT}`);

  await createDoctor();
  await seedMedicines();
});
