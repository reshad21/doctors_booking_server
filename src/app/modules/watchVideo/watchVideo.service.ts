import { Status, WatchVideo } from '@prisma/client';
import prisma from '../../../db/db.config';
import { IWatchVideo } from './watchVideoTypes';

const createWatchVideoIntoDB = async (payload: IWatchVideo) => {

    const result = await prisma.watchVideo.create({
        data: payload as WatchVideo,
    });
    return result;
};



const getWatchVideoFromDB = async () => {
    const result = await prisma.watchVideo.findMany({

    });
    return result;
}

const getWatchVideoByIdFromDB = async (id: string) => {
    const result = await prisma.watchVideo.findUnique({
        where: {
            id,
        },
    });
    return result;
}

 const deleteWatchVideoByIdFromDB = async (id: string) => {
    const result = await prisma.watchVideo.delete({
        where: {
            id,
        },
    });
    return result;
 }

//  const updateWatchVideoByIdFromDB = async (id: string, payload: IWatchVideo) => {
//     const result = await prisma.watchVideo.update({
//         where: {
//             id,
//         },
//         data: payload as WatchVideo,
//     });
//     return result;
//  }



const updateWatchVideoByIdFromDB = async (id: string, payload: WatchVideo) => {
    const result = await prisma.watchVideo.update({
        where: {
            id,
        },
        // data: {
        //     videoFile: payload.videoFile,
        //     status: payload.status as Status, // Cast to your enum type if needed
        // },
        data: {
          ...payload,

        },
    });
    return result;
}


const getOnlyActiveVideoFromDB = async () => {
    const result = await prisma.watchVideo.findMany({
        where: {
            status: Status.ACTIVE,
        },
    });
    return result;
}
export const WatchVideoServices = {
    createWatchVideoIntoDB,
    getWatchVideoFromDB,
    getWatchVideoByIdFromDB,
    deleteWatchVideoByIdFromDB,
    updateWatchVideoByIdFromDB,
    getOnlyActiveVideoFromDB,
};
