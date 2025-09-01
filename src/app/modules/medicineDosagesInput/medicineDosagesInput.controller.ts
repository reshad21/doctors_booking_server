import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MedicineDosagesInputService } from './medicineDosagesInput.service';

const createMedicineDosagesInput = catchAsync(async (req, res) => {
  const payload = req.body;
  const medicineDosagesInput = await MedicineDosagesInputService.createMedicineDosagesInput(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Medicine dosages input created successfully',
    data: medicineDosagesInput,
  });
});

const getAllMedicineDosagesInputs = catchAsync(async (req, res) => {
  const medicineDosagesInputs = await MedicineDosagesInputService.getAllMedicineDosagesInputs(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages inputs fetched successfully',
    data: medicineDosagesInputs,
  });
});

const getMedicineDosagesInputById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const medicineDosagesInput = await MedicineDosagesInputService.getMedicineDosagesInputById(id);
  if (!medicineDosagesInput) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Medicine dosages input not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages input fetched successfully',
    data: medicineDosagesInput,
  });
});

const updateMedicineDosagesInput = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const medicineDosagesInput = await MedicineDosagesInputService.updateMedicineDosagesInput(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages input updated successfully',
    data: medicineDosagesInput,
  });
});

const deleteMedicineDosagesInput = catchAsync(async (req, res) => {
  const { id } = req.params;
  await MedicineDosagesInputService.deleteMedicineDosagesInput(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine dosages input deleted successfully',
  });
});

export const MedicineDosagesInputController = {
  createMedicineDosagesInput,
  getAllMedicineDosagesInputs,
  getMedicineDosagesInputById,
  updateMedicineDosagesInput,
  deleteMedicineDosagesInput,
};
