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

export const MedicalInputController = {
  getAllMedicalInputs,
};
