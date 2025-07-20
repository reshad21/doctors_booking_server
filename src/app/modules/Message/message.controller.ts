import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessageService } from './message.service';

const sendMessageHandler = catchAsync(async (req, res) => {
    const phone = req.body?.number
    let number 
    if (phone?.charAt(0) == "0") {
        number = phone
    }else{
    number = phone.replace(/^(\+88|88)/, "0").slice(1);
    }
    
  const result = await MessageService.sendSingleMsgFromDB({number,message:req?.body?.message});

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Send message successfully',
    data: result
  });
});

export const MessageController = {
  sendMessageHandler,
};
