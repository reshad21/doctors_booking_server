import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PrescriptionServices } from './prescription.service';

const createPrescription = catchAsync(async (req, res) => {
  const response = await PrescriptionServices.createPrescriptionIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create Prescription Successful',
    data: response,
  });
});
const getPrescriptionByPatientId = catchAsync(async (req, res) => {
  const response = await PrescriptionServices.getPrescriptionByPatientIdIntoDB(req.params.patientId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Prescription Successful',
    data: response,
  });
});
export const PrescriptionController = {
  createPrescription,
  getPrescriptionByPatientId
};
