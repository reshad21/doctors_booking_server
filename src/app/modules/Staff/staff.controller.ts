/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { StaffServices } from './staff.service';

const createStaff = catchAsync(async (req, res) => {
  const file = req.file;

  const image = getSingleImageUrl(req, file);
  const payload = {
    ...req.body,
    image,
  };

  const response = await StaffServices.createStaffIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create Staff Successful',
    data: response,
  });
});

const updateStaff = catchAsync(async (req, res) => {
  const file = req.file;

  const payload: any = { ...req.body };
  if (file) {
    payload.image = getSingleImageUrl(req, file);
  }
  
  const response = await StaffServices.updateStaffIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update Staff Successful',
    data: response,
  });
});

const getStaff = catchAsync(async (req, res) => {
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };
  const response = await StaffServices.getStaffIntoDB(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Staff Successful',
    data: response,
  });
});
const staffsDoctor = catchAsync(async (req, res) => {
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };
  const response = await StaffServices.getStaffsDoctorIntoDB(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Staff's doctor Successful",
    data: response,
  });
});

const getDelete = catchAsync(async (req, res) => {
  const response = await StaffServices.deleteStaffIntoDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Staff Delete Successful',
    data: response,
  });
});

const login = catchAsync(async (req, res) => {
  const response = await StaffServices.loginIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login Successful',
    data: response,
  });
});

const allowDisallowPermissionForStaff = catchAsync(async (req, res) => {
  await StaffServices.allowAndDisallowPermissionForStaffInDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Permission Update Successful',
  });
});

export const StaffController = {
  createStaff,
  updateStaff,
  getStaff,
  staffsDoctor,
  getDelete,
  login,
  allowDisallowPermissionForStaff,
};
