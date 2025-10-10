import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DiagnosisInputService } from './DiagnosisInput.service';

const createDiagnosisInput = catchAsync(async (req, res) => {
  const response = await DiagnosisInputService.createDiagnosisInputIntoBD(
    req.body,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Diagnosis Input created successfully',
    data: response,
  });
});

const getAllDiagnosisInputs = catchAsync(async (req, res) => {
  const response = await DiagnosisInputService.getAllDiagnosisInputsFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Diagnosis Inputs retrieved successfully',
    data: response,
  });
});

const updateDiagnosisInput = catchAsync(async (req, res) => {
  const response = await DiagnosisInputService.updateDiagnosisInputIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Diagnosis Input updated successfully',
    data: response,
  });
});

const deleteDiagnosisInput = catchAsync(async (req, res) => {
  const response = await DiagnosisInputService.deleteDiagnosisInputFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Diagnosis Input deleted successfully',
    data: response,
  });
});

const getDiagnosisInputById = catchAsync(async (req, res) => {
  const response = await DiagnosisInputService.getDiagnosisInputByIdFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Diagnosis Input fetched successfully',
    data: response,
  });
});

export const DiagnosisInputController = {
  createDiagnosisInput,
  getAllDiagnosisInputs,
  getDiagnosisInputById,
  updateDiagnosisInput,
  deleteDiagnosisInput,
};
