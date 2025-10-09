import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MedicalInputService } from './medicinesList.service';

const getAllMedicalInputs = catchAsync(async (req, res) => {
  const diagnoses = await MedicalInputService.getMedicineInputsFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicines fetched successfully',
    data: diagnoses,
  });
});

const createMedicineInput = catchAsync(async (req, res) => {
  const response = await MedicalInputService.createMedicineInputIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Medicine created successfully',
    data: response,
  });
});

const updateMedicineInput = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await MedicalInputService.updateMedicineInputInDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine updated successfully',
    data: response,
  });
});

const deleteMedicineInput = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await MedicalInputService.deleteMedicineInputFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Medicine deleted successfully',
    data: response,
  });
});

export const MedicalInputController = {
  getAllMedicalInputs,
  createMedicineInput,
  updateMedicineInput,
  deleteMedicineInput,
};
