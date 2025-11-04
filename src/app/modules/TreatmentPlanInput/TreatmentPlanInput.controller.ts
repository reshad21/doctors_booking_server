import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TreatmentPlanInputService } from './TreatmentPlanInput.service';

const createTreatmentPlanInput = catchAsync(async (req, res) => {
  const response =
    await TreatmentPlanInputService.createTreatmentPlanInputIntoBD(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Treatment Plan Input created successfully',
    data: response,
  });
});

const getAllTreatmentPlanInputs = catchAsync(async (req, res) => {
  const response =
    await TreatmentPlanInputService.getAllTreatmentPlanInputsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Treatment Plan Inputs retrieved successfully',
    data: response,
  });
});

const updateTreatmentPlanInput = catchAsync(async (req, res) => {
  const response =
    await TreatmentPlanInputService.updateTreatmentPlanInputIntoDB(
      req.params.id,
      req.body,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Treatment Plan Input updated successfully',
    data: response,
  });
});

const deleteTreatmentPlanInput = catchAsync(async (req, res) => {
  const response =
    await TreatmentPlanInputService.deleteTreatmentPlanInputFromDB(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Treatment Plan Input deleted successfully',
    data: response,
  });
});

const getTreatmentPlanInputById = catchAsync(async (req, res) => {
  const response =
    await TreatmentPlanInputService.getTreatmentPlanInputByIdFromDB(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Treatment Plan Input fetched successfully',
    data: response,
  });
});

export const TreatmentPlanInputController = {
  createTreatmentPlanInput,
  getAllTreatmentPlanInputs,
  getTreatmentPlanInputById,
  updateTreatmentPlanInput,
  deleteTreatmentPlanInput,
};

