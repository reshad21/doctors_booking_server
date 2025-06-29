import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
const prisma: PrismaClient = new PrismaClient();



export const createDoctor = async () => {
  const isRoleExists = await prisma.doctor.findFirst();

  if (!isRoleExists) {
     const password = await bcryptjs.hash('system@gmail.com', 10);
    await prisma.doctor.create({
      data:{
        name: "System Admin",
        email:"system@gmail.com",
        password,
        phone:"N/A",
        image:"N/A"
      }
    });
    
  }

};