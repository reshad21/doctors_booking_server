/* eslint-disable no-console */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFoundErrorHandler from './app/middlewares/notFoundErrorHandler';

// Initialize the express application
const app: Application = express();

app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:5173',
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
    : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin || true);
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

// Health check
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Importing routes
app.use('/api/v1', router);

// Error handling middleware
app.use(globalErrorHandler);

// 404 Not Found middleware
app.use(notFoundErrorHandler);

export default app;
