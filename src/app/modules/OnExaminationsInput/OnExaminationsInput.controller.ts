import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OnExaminationsInputService } from './OnExaminationsInput.service';

const createOnExaminationsInput = catchAsync(async (req, res) => {
  const response =
    await OnExaminationsInputService.createOnExaminationsInputIntoBD(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'On Examinations Input created successfully',
    data: response,
  });
});

const getAllOnExaminationsInputs = catchAsync(async (req, res) => {
  const response =
    await OnExaminationsInputService.getAllOnExaminationsInputsFromDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'On Examinations Inputs retrieved successfully',
    data: response,
  });
});

const updateOnExaminationsInput = catchAsync(async (req, res) => {
  const response =
    await OnExaminationsInputService.updateOnExaminationsInputIntoDB(
      req.params.id,
      req.body,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'On Examinations Input updated successfully',
    data: response,
  });
});

const deleteOnExaminationsInput = catchAsync(async (req, res) => {
  const response =
    await OnExaminationsInputService.deleteOnExaminationsInputFromDB(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'On Examinations Input deleted successfully',
    data: response,
  });
});

const getOnExaminationsInputById = catchAsync(async (req, res) => {
  const response =
    await OnExaminationsInputService.getOnExaminationsInputByIdFromDB(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'On Examinations Input fetched successfully',
    data: response,
  });
});

export const OnExaminationsInputController = {
  createOnExaminationsInput,
  getAllOnExaminationsInputs,
  getOnExaminationsInputById,
  updateOnExaminationsInput,
  deleteOnExaminationsInput,
};
