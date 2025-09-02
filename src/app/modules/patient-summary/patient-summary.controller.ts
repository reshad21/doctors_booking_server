/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PatientSummaryService } from './paitent-summary.service';

// export const getPatientSummary = catchAsync(async (req, res) => {
//   const chamberId = req.query.chamberId as string;
//   const user = {
//     ...req.user,
//     id: (req.user as any).id,
//     type: (req.user as any).type,
//   };

//   const result = await PatientSummaryService.getPatientSummaryFromDB(user,chamberId);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Patient summary fetched successfully',
//     data: result,
//   });
// });

export const getPatientSummary = catchAsync(async (req, res) => {
  const chamberId = req.query.chamberId as string;
  const timezoneOffset = req.query.timezoneOffset as string; // Get timezoneOffset from query
  
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };

  // Parse timezoneOffset to number if provided, otherwise undefined
  const tzOffset = timezoneOffset ? parseInt(timezoneOffset) : undefined;

  const result = await PatientSummaryService.getPatientSummaryFromDB(
    user,
    chamberId,
    tzOffset // Pass timezoneOffset to service
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Patient summary fetched successfully',
    data: result,
  });
});
export const PatientSummaryController = {
  getPatientSummary,
};
