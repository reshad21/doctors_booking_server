/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PatientService } from './patient.service';

const createPatientHandler = catchAsync(async (req, res) => {
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };

  const result = await PatientService.createPatientIntoDB(req.body, user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Patient created successfully',
    data: result,
  });
});

const getPatientHandler = catchAsync(async (req, res) => {
  const patients = await PatientService.getPatientsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Patients fetched successfully',
    data: patients,
  });
});

export const PatientController = {
  createPatientHandler,
  getPatientHandler,
};
