import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChiefComplaintInputService } from './ChiefComplaintInput.service';

const createChiefComplaintInput = catchAsync(async (req, res) => {
  const response =
    await ChiefComplaintInputService.createChiefComplaintInputIntoBD(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Chief Complaint Input created successfully',
    data: response,
  });
});

const getAllChiefComplaintInputs = catchAsync(async (req, res) => {
  const response =
    await ChiefComplaintInputService.getAllChiefComplaintInputsFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Chief Complaint Inputs retrieved successfully',
    data: response,
  });
});

const updateChiefComplaintInput = catchAsync(async (req, res) => {
  const response =
    await ChiefComplaintInputService.updateChiefComplaintInputIntoDB(
      req.params.id,
      req.body,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Chief Complaint Input updated successfully',
    data: response,
  });
});

const deleteChiefComplaintInput = catchAsync(async (req, res) => {
  const response =
    await ChiefComplaintInputService.deleteChiefComplaintInputFromDB(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Chief Complaint Input deleted successfully',
    data: response,
  });
});

const getChiefComplaintInputById = catchAsync(async (req, res) => {
  const response =
    await ChiefComplaintInputService.getChiefComplaintInputByIdFromDB(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Chief Complaint Input fetched successfully',
    data: response,
  });
});

export const ChiefComplaintInputController = {
  createChiefComplaintInput,
  getAllChiefComplaintInputs,
  getChiefComplaintInputById,
  updateChiefComplaintInput,
  deleteChiefComplaintInput,
};
