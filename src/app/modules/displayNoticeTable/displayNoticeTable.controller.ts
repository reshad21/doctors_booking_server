import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DisplayNoticeTableService } from './displayNoticeTable.service';

const createDisplayNotice = catchAsync(async (req, res) => {
  const payload = req.body;
  const notice = await DisplayNoticeTableService.createDisplayNotice(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Display notice created successfully',
    data: notice,
  });
});

const getAllDisplayNotices = catchAsync(async (req, res) => {
  const notices = await DisplayNoticeTableService.getAllDisplayNotices();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Display notices fetched successfully',
    data: notices,
  });
});

const getDisplayNoticeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const notice = await DisplayNoticeTableService.getDisplayNoticeById(id);
  if (!notice) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Display notice not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Display notice fetched successfully',
    data: notice,
  });
});

const updateDisplayNotice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const notice = await DisplayNoticeTableService.updateDisplayNotice(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Display notice updated successfully',
    data: notice,
  });
});

const deleteDisplayNotice = catchAsync(async (req, res) => {
  const { id } = req.params;
  await DisplayNoticeTableService.deleteDisplayNotice(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Display notice deleted successfully',
  });
});

export const DisplayNoticeTableController = {
  createDisplayNotice,
  getAllDisplayNotices,
  getDisplayNoticeById,
  updateDisplayNotice,
  deleteDisplayNotice,
};