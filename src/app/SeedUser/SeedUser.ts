/* eslint-disable no-console */
import prisma from '../../db/db.config';
import bcryptjs from 'bcryptjs';
import { routeAccess } from '../context/routeAccess';

const doctors = [
  {
    name: 'AK',
    email: 'asifkhan@gmail.com',
    password: 'asifkhan@gmail.com',
    phone: '0123456789',
    image: 'N/A',
  },
  {
    name: 'MRS',
    email: 'mrs@gmail.com',
    password: 'mrs@gmail.com',
    phone: '0987654321',
    image: 'N/A',
  },
  {
    name: 'Sourov',
    email: 'sourov@gmail.com',
    password: 'sourov@gmail.com',
    phone: '0198765432',
    image: 'N/A',
  },
  {
    name: 'Reshad',
    email: 'reshad@gmail.com',
    password: 'reshad@gmail.com',
    phone: '0198765432',
    image: 'N/A',
  },
  {
    name: 'Saikat',
    email: 'system@gmail.com',
    password: 'system@gmail.com',
    phone: '0188765432',
    image: 'N/A',
  },
];

export const createDoctor = async () => {
  for (const doc of doctors) {
    const exists = await prisma.doctor.findUnique({
      where: { email: doc.email },
    });

    if (!exists) {
      const hashedPass = await bcryptjs.hash(doc.password, 10);

      await prisma.doctor.create({
        data: {
          name: doc.name,
          email: doc.email,
          phone: doc.phone,
          image: doc.image,
          password: hashedPass,
          routeAccess: {
            create: routeAccess.map((route) => ({
              path: route.path,
              name: route.name,
              allowed: route.allowed ?? true,
            })),
          },
        },
      });

      console.log(`✅ Created doctor: ${doc.name}`);
    } else {
      console.log('ℹ️  Doctor already exists, skipping creation.');
    }
  }
};
