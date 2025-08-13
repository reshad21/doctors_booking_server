/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
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

const updateDoctor = catchAsync(async (req, res) => {
  const file = req.file;

  const payload: any = { ...req.body };
  if (file) {
    payload.image = getSingleImageUrl(req, file);
  }

  const response = await AuthServices.updateDoctorDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update Doctor Info Successful',
    data: response,
  });
});

export const AuthController = {
  login,
  updateDoctor,
};
