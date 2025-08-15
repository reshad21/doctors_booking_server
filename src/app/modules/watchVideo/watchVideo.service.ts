import { Status, WatchVideo } from '@prisma/client';
import prisma from '../../../db/db.config';
import { IWatchVideo } from './watchVideoTypes';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

const createWatchVideoIntoDB = async (payload: IWatchVideo) => {
  const result = await prisma.watchVideo.create({
    data: payload as WatchVideo,
  });
  return result;
};

const getWatchVideoFromDB = async (user: User) => {
  const doctorId = await getDoctorIdForUser(user);
  const result = await prisma.watchVideo.findMany({
    where: { doctorId },
  });
  return result;
};

const getWatchVideoByIdFromDB = async (id: string) => {
  const result = await prisma.watchVideo.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteWatchVideoByIdFromDB = async (id: string) => {
  const result = await prisma.watchVideo.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateWatchVideoByIdFromDB = async (id: string, payload: WatchVideo) => {
  const result = await prisma.watchVideo.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });
  return result;
};

const getOnlyActiveVideoFromDB = async (user: User) => {
  const doctorId = await getDoctorIdForUser(user);
  const result = await prisma.watchVideo.findMany({
    where: {
      status: Status.ACTIVE,
      doctorId,
    },
  });
  return result;
};

export const WatchVideoServices = {
  createWatchVideoIntoDB,
  getWatchVideoFromDB,
  getWatchVideoByIdFromDB,
  deleteWatchVideoByIdFromDB,
  updateWatchVideoByIdFromDB,
  getOnlyActiveVideoFromDB,
};
