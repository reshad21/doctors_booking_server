/* eslint-disable no-console */
import http from 'http';
import app from './app';
import { initSocket } from './socket';
import config from './app/configs';
import { createDoctor } from './app/SeedUser/SeedUser';
import { seedMedicines } from './app/seed/seedMedicines';

const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:5173',
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
    : []),
];

export const io = initSocket(server, allowedOrigins);

server.listen(config.PORT, async () => {
  console.log(`Server is running on port ${config.PORT}`);

  await createDoctor();
  await seedMedicines();
});
