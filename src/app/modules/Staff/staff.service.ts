import prisma from '../../../db/db.config'
import AppError from '../../errors/AppError';
import { TStaff } from '../../types/staff.type';

const createStaffIntoDB = async (payload:TStaff) => {
  const existingStaff = await prisma.staff.findFirst();

  if (existingStaff) {
    throw new AppError(404, 'Staff is already created');
  }

 const response = await prisma.staff.create({
    data:{
        name: payload?.name,
        email:payload?.email,
        phone:payload?.phone,
        image:payload?.image,
        password:payload?.password,
        doctorId:payload?.doctorId
    }
 })
  return response
};
const deleteStaffIntoDB = async (id:string) => {
 const response = await prisma.staff.delete({
  where:{id}
 })
  return response
};
const getStaffIntoDB = async () => {
  const response = await prisma.staff.findMany();
  if (response == null) {
    throw new AppError(404, "Staff not Found")
  }
  return response
};

export const StaffServices = {
  createStaffIntoDB,
  getStaffIntoDB,
  deleteStaffIntoDB
};