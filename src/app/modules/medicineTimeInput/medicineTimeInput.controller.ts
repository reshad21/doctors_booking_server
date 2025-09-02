/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MedicineTimeInputService } from './medicineTimeInput.service';

const createMedicineTimeInput = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };
  const medicineTimeInput =
    await MedicineTimeInputService.createMedicineTimeInput(payload, user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Medicine time input created successfully',
    data: medicineTimeInput,
  });
});

const getAllMedicineTimeInputs = catchAsync(async (req, res) => {
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };
  const medicineTimeInputs =
    await MedicineTimeInputService.getAllMedicineTimeInputs(req.query, user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine time inputs fetched successfully',
    data: medicineTimeInputs,
  });
});

const getMedicineTimeInputById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const medicineTimeInput =
    await MedicineTimeInputService.getMedicineTimeInputById(id);
  if (!medicineTimeInput) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Medicine time input not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine time input fetched successfully',
    data: medicineTimeInput,
  });
});

const updateMedicineTimeInput = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const medicineTimeInput =
    await MedicineTimeInputService.updateMedicineTimeInput(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine time input updated successfully',
    data: medicineTimeInput,
  });
});

const deleteMedicineTimeInput = catchAsync(async (req, res) => {
  const { id } = req.params;
  await MedicineTimeInputService.deleteMedicineTimeInput(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine time input deleted successfully',
  });
});

export const MedicineTimeInputController = {
  createMedicineTimeInput,
  getAllMedicineTimeInputs,
  getMedicineTimeInputById,
  updateMedicineTimeInput,
  deleteMedicineTimeInput,
};
