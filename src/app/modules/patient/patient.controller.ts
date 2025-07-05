import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PatientService } from './patient.service';

const createPatientHandler = catchAsync(async (req, res) => {

  const result = await PatientService.createPatientIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Patient created successfully',
    data: result,
  });
});

export const PatientController = {
  createPatientHandler,
};
