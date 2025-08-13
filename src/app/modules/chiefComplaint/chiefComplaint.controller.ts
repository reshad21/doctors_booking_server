// ... existing code ...
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChiefComplaintService } from './chiefComplaint.service';

const createChiefComplaint = catchAsync(async (req, res) => {
  const payload = req.body;
  const chiefComplaint = await ChiefComplaintService.createChiefComplaint(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'ChiefComplaint created successfully',
    data: chiefComplaint,
  });
});

const getAllChiefComplaints = catchAsync(async (req, res) => {
  const chiefComplaints = await ChiefComplaintService.getAllChiefComplaints(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'ChiefComplaints fetched successfully',
    data: chiefComplaints,
  });
});

const getChiefComplaintById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const chiefComplaint = await ChiefComplaintService.getChiefComplaintById(id);
  if (!chiefComplaint) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'ChiefComplaint not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'ChiefComplaint fetched successfully',
    data: chiefComplaint,
  });
});

const updateChiefComplaint = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const chiefComplaint = await ChiefComplaintService.updateChiefComplaint(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'ChiefComplaint updated successfully',
    data: chiefComplaint,
  });
});

const deleteChiefComplaint = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ChiefComplaintService.deleteChiefComplaint(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'ChiefComplaint deleted successfully',
  });
});

export const ChiefComplaintController = {
  createChiefComplaint,
  getAllChiefComplaints,
  getChiefComplaintById,
  updateChiefComplaint,
  deleteChiefComplaint,
};
// ... existing code ...