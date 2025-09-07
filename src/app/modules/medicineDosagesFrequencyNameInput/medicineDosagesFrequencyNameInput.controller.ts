/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MedicineDosagesFrequencyNameInputService } from './medicineDosagesFrequencyNameInput.service';

const createMedicineDosagesFrequencyNameInput = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };

  const medicineDosagesFrequencyNameInput =
    await MedicineDosagesFrequencyNameInputService.createMedicineDosagesFrequencyNameInput(payload, user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Medicine dosages frequency name input created successfully',
    data: medicineDosagesFrequencyNameInput,
  });
});

const getAllMedicineDosagesFrequencyNameInputs = catchAsync(async (req, res) => {
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };
  
  const medicineDosagesFrequencyNameInputs =
    await MedicineDosagesFrequencyNameInputService.getAllMedicineDosagesFrequencyNameInputs(req.query, user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages frequency name inputs fetched successfully',
    data: medicineDosagesFrequencyNameInputs,
  });
});

const getMedicineDosagesFrequencyNameInputById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const medicineDosagesFrequencyNameInput =
    await MedicineDosagesFrequencyNameInputService.getMedicineDosagesFrequencyNameInputById(id);
  if (!medicineDosagesFrequencyNameInput) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Medicine dosages frequency name input not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages frequency name input fetched successfully',
    data: medicineDosagesFrequencyNameInput,
  });
});

const updateMedicineDosagesFrequencyNameInput = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const medicineDosagesFrequencyNameInput =
    await MedicineDosagesFrequencyNameInputService.updateMedicineDosagesFrequencyNameInput(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages frequency name input updated successfully',
    data: medicineDosagesFrequencyNameInput,
  });
});

const deleteMedicineDosagesFrequencyNameInput = catchAsync(async (req, res) => {
  const { id } = req.params;
  await MedicineDosagesFrequencyNameInputService.deleteMedicineDosagesFrequencyNameInput(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages frequency name input deleted successfully',
  });
});

export const MedicineDosagesFrequencyNameInputController = {
  createMedicineDosagesFrequencyNameInput,
  getAllMedicineDosagesFrequencyNameInputs,
  getMedicineDosagesFrequencyNameInputById,
  updateMedicineDosagesFrequencyNameInput,
  deleteMedicineDosagesFrequencyNameInput,
};
