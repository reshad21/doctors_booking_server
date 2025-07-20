import configs from "../../configs";
import AppError from "../../errors/AppError";

const sendSingleMsgFromDB = async (payload:{message:string,number:string}) => {
  const { message, number } = payload;
  const apiKey = configs.API_KEY;
  const senderId = configs.SENDER_ID;
  const url = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${encodeURIComponent(number)}&senderid=${senderId}&message=${encodeURIComponent(message)}`;
  const result = await fetch(url, {
    method: "GET",
  });

  if (!result.ok) {
    throw new AppError(500, "Failed to send SMS");
  }
  const data = await result.json();
  return data;
};


export const MessageService = {sendSingleMsgFromDB};
