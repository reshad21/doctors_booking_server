import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const getAdminById = catchAsync(async (req, res) => {
  const result = await AdminService.getAdminUserById(req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin fetched successfully',
    data: result,
  });
});

export const AdminController = {
  getAdminById,
};
