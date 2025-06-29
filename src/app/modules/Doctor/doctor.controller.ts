import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './doctor.service';

const login = catchAsync(async (req, res) => {
  const response = await AuthServices.loginIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login Successful',
    data: response,
  });
});

export const AuthController = {
  login,
};