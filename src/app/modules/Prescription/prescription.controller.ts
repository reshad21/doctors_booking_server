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
const getPrescriptionById = catchAsync(async (req, res) => {
  console.log(req.params.id);
  
  const response = await PrescriptionServices.getPrescriptionByIdIntoDB(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Prescription by id Successful',
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
  getPrescriptionById,
  updatePrescription,
  createExtraAdvice,
  getExceptionalAdvice
};
