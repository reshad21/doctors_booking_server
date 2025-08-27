/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PatientSummaryService } from './paitent-summary.service';

export const getPatientSummary = catchAsync(async (req, res) => {
  const chamberName = req.query.chamberName as string;
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };

  const result = await PatientSummaryService.getPatientSummaryFromDB(user,chamberName);

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
