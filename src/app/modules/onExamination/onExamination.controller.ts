import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OnExaminationService } from './onExamination.service';

const createOnExamination = catchAsync(async (req, res) => {
  const payload = req.body;
  const onExamination = await OnExaminationService.createOnExamination(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'OnExamination created successfully',
    data: onExamination,
  });
});

const getAllOnExaminations = catchAsync(async (req, res) => {
  const onExaminations = await OnExaminationService.getAllOnExaminations(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OnExaminations fetched successfully',
    data: onExaminations,
  });
});

const getOnExaminationById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const onExamination = await OnExaminationService.getOnExaminationById(id);
  if (!onExamination) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'OnExamination not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OnExamination fetched successfully',
    data: onExamination,
  });
});

const updateOnExamination = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const onExamination = await OnExaminationService.updateOnExamination(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OnExamination updated successfully',
    data: onExamination,
  });
});

const deleteOnExamination = catchAsync(async (req, res) => {
  const { id } = req.params;
  await OnExaminationService.deleteOnExamination(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OnExamination deleted successfully',
  });
});

export const OnExaminationController = {
  createOnExamination,
  getAllOnExaminations,
  getOnExaminationById,
  updateOnExamination,
  deleteOnExamination,
};