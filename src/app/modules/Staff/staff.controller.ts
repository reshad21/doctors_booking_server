import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { StaffServices } from './staff.service';

const createStaff = catchAsync(async (req, res) => {
  const file = req.file;

  console.log(file, 'file')
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
const getStaff = catchAsync(async (req, res) => {
  const response = await StaffServices.getStaffIntoDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Staff Successful',
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

export const StaffController = {
  createStaff,
  getStaff,
  getDelete,
};
