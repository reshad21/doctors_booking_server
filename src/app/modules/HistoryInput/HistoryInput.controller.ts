import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HistoryInputService } from './HistoryInput.service';

const createHistoryInput = catchAsync(async (req, res) => {
  const response = await HistoryInputService.createHistoryInputIntoBD(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'History Input created successfully',
    data: response,
  });
});

const getAllHistoryInputs = catchAsync(async (req, res) => {
  const response = await HistoryInputService.getAllHistoryInputsFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'History Inputs retrieved successfully',
    data: response,
  });
});

const updateHistoryInput = catchAsync(async (req, res) => {
  const response = await HistoryInputService.updateHistoryInputIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'History Input updated successfully',
    data: response,
  });
});

const deleteHistoryInput = catchAsync(async (req, res) => {
  const response = await HistoryInputService.deleteHistoryInputFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'History Input deleted successfully',
    data: response,
  });
});

const getHistoryInputById = catchAsync(async (req, res) => {
  const response = await HistoryInputService.getHistoryInputByIdFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'History Input fetched successfully',
    data: response,
  });
});

export const HistoryInputController = {
  createHistoryInput,
  getAllHistoryInputs,
  getHistoryInputById,
  updateHistoryInput,
  deleteHistoryInput,
};
