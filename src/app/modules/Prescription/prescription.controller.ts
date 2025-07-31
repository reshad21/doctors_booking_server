import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PrescriptionServices } from './prescription.service';

const getPrescriptionByPatientId = catchAsync(async (req, res) => {
  const response = await PrescriptionServices.getPrescriptionByPatientIdIntoDB(req.params.patientId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Prescription Successful',
    data: response,
  });
});
const getExceptionalAdvice = catchAsync(async (req, res) => {
  const response = await PrescriptionServices.getExceptionalIntoDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get exceptional advice Successful',
    data: response,
  });
});
const createPrescription = catchAsync(async (req, res) => {

  const response = await PrescriptionServices.createPrescriptionIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create Prescription Successful',
    data: response,
  });
});
const createExtraAdvice = catchAsync(async (req, res) => {
  const {content} = req.body
  const response = await PrescriptionServices.createExceptionalIntoDB(content)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create extra advice Successful',
    data: response,
  });
});
const updatePrescription = catchAsync(async (req, res) => {
  
  
  const response = await PrescriptionServices.updatePrescriptionIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update Prescription Successful',
    data: response,
  });
});


export const PrescriptionController = {
  createPrescription,
  getPrescriptionByPatientId,
  updatePrescription,
  createExtraAdvice,
  getExceptionalAdvice
};
