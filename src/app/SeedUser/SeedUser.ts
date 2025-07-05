/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { routeAccess } from '../context/routeAccess';

const prisma = new PrismaClient();

export const createDoctor = async () => {
  const existingDoctor = await prisma.doctor.findFirst();

  if (!existingDoctor) {
    const password = await bcryptjs.hash(`${process.env.ADMIN_PASS}`, 10);

    await prisma.doctor.create({
      data: {
        name: `${process.env.ADMIN_FULLNAME}`,
        email: `${process.env.ADMIN_EMAIL}`,
        password,
        phone: 'N/A',
        image: 'N/A',
        routeAccess: {
          create: routeAccess,
        },
      },
    });
  } else {
    console.log('ℹ️  Doctor already exists, skipping creation.');
  }

  await prisma.$disconnect();
};
