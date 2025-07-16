/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessageService } from './Message.service';

const sendMessageHandler = catchAsync(async (req, res) => {
  const result = await MessageService.sendSingleMsgFromDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Send message successfully',
    data: result,
  });
});

export const MessageController = {
  sendMessageHandler,
};
