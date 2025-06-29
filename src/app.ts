import express, { Application } from 'express';
import cors from 'cors';
import config from './app/configs';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFoundErrorHandler from './app/middlewares/notFoundErrorHandler';
import { createDoctor } from './app/SeedUser/SeedUser';

// Initialize the express application
const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Backend in Onneshon!',
  });
});

// Importing routes
app.use('/api/v1', router);

// Error handling middleware
app.use(globalErrorHandler);

// 404 Not Found middleware
app.use(notFoundErrorHandler);

// Running the server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  createDoctor()
});
