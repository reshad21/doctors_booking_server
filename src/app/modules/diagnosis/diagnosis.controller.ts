// ... existing code ...
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DiagnosisService } from './diagnosis.service';

const createDiagnosis = catchAsync(async (req, res) => {
  const payload = req.body;
  const diagnosis = await DiagnosisService.createDiagnosis(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Diagnosis created successfully',
    data: diagnosis,
  });
});

const getAllDiagnoses = catchAsync(async (req, res) => {
  const diagnoses = await DiagnosisService.getAllDiagnoses(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Diagnoses fetched successfully',
    data: diagnoses,
  });
});

const getDiagnosisById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const diagnosis = await DiagnosisService.getDiagnosisById(id);
  if (!diagnosis) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Diagnosis not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Diagnosis fetched successfully',
    data: diagnosis,
  });
});

const updateDiagnosis = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const diagnosis = await DiagnosisService.updateDiagnosis(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Diagnosis updated successfully',
    data: diagnosis,
  });
});

const deleteDiagnosis = catchAsync(async (req, res) => {
  const { id } = req.params;
  await DiagnosisService.deleteDiagnosis(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Diagnosis deleted successfully',
  });
});

export const DiagnosisController = {
  createDiagnosis,
  getAllDiagnoses,
  getDiagnosisById,
  updateDiagnosis,
  deleteDiagnosis,
};
// ... existing code ...