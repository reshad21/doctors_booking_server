import { endOfDay, startOfDay } from 'date-fns';
import prisma from '../../../db/db.config';
import configs from '../../configs';
import AppError from '../../errors/AppError';

const sendSingleMsgFromDB = async (payload: {
  message: string;
  number: string;
}) => {
  const { message, number } = payload;
  const apiKey = "0tDEflz7wAvD9gQgSii0";
  const senderId = "8809617625538";
  // const apiKey = configs.API_KEY;
  // const senderId = configs.SENDER_ID;

  const url = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${encodeURIComponent(number)}&senderid=${senderId}&message=${encodeURIComponent(message)}`;

  const result = await fetch(url, {
    method: 'GET',
  });
  console.log(result, "result")

  if (!result.ok) {
    throw new AppError(500, 'Failed to send SMS');
  }
  const data = await result.json();
  return data;
};

const sendMsgFromDB = async (payload: { message: string }) => {
  const { message } = payload;
  const apiKey = configs.API_KEY;
  const senderId = configs.SENDER_ID;
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const response = await prisma.patient.findMany({
    where: {
      createdAt: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
    select: {
      phoneNumber: true,
    },
  });

  const number = response.map((s) => s.phoneNumber).join(',');

  if (!number) {
    throw new AppError(404, 'No patient available found fot today');
  }

  const url = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${encodeURIComponent(number)}&senderid=${senderId}&message=${encodeURIComponent(message)}`;
  const result = await fetch(url, {
    method: 'GET',
  });

  if (!result.ok) {
    throw new AppError(500, 'Failed to send SMS');
  }
  const data = await result.json();
  return data;
};


export const MessageService = { sendSingleMsgFromDB, sendMsgFromDB };
