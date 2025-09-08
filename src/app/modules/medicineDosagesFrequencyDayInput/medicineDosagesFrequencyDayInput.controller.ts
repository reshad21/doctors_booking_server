/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MedicineDosagesFrequencyDayInputService } from './medicineDosagesFrequencyDayInput.service';

const createMedicineDosagesFrequencyDayInput = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };

  const medicineDosagesFrequencyDayInput =
    await MedicineDosagesFrequencyDayInputService.createMedicineDosagesFrequencyDayInput(payload, user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Medicine dosages frequency day input created successfully',
    data: medicineDosagesFrequencyDayInput,
  });
});

const getAllMedicineDosagesFrequencyDayInputs = catchAsync(async (req, res) => {
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };
  
  const medicineDosagesFrequencyDayInputs =
    await MedicineDosagesFrequencyDayInputService.getAllMedicineDosagesFrequencyDayInputs(req.query, user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages frequency day inputs fetched successfully',
    data: medicineDosagesFrequencyDayInputs,
  });
});

const getMedicineDosagesFrequencyDayInputById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const medicineDosagesFrequencyDayInput =
    await MedicineDosagesFrequencyDayInputService.getMedicineDosagesFrequencyDayInputById(id);
  if (!medicineDosagesFrequencyDayInput) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Medicine dosages frequency day input not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages frequency day input fetched successfully',
    data: medicineDosagesFrequencyDayInput,
  });
});

const updateMedicineDosagesFrequencyDayInput = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const medicineDosagesFrequencyDayInput =
    await MedicineDosagesFrequencyDayInputService.updateMedicineDosagesFrequencyDayInput(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages frequency day input updated successfully',
    data: medicineDosagesFrequencyDayInput,
  });
});

const deleteMedicineDosagesFrequencyDayInput = catchAsync(async (req, res) => {
  const { id } = req.params;
  await MedicineDosagesFrequencyDayInputService.deleteMedicineDosagesFrequencyDayInput(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages frequency day input deleted successfully',
  });
});

export const MedicineDosagesFrequencyDayInputController = {
  createMedicineDosagesFrequencyDayInput,
  getAllMedicineDosagesFrequencyDayInputs,
  getMedicineDosagesFrequencyDayInputById,
  updateMedicineDosagesFrequencyDayInput,
  deleteMedicineDosagesFrequencyDayInput,
};
