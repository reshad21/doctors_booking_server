/* eslint-disable @typescript-eslint/no-explicit-any */
// ... existing code ...
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InvestigationService } from './investigation.service';

const createInvestigation = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };

  const investigation = await InvestigationService.createInvestigation(
    payload,
    user,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Investigation created successfully',
    data: investigation,
  });
});

const getAllInvestigations = catchAsync(async (req, res) => {
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };

  const investigations = await InvestigationService.getAllInvestigations(
    req.query,
    user
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Investigations fetched successfully',
    data: investigations,
  });
});

const getInvestigationById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const investigation = await InvestigationService.getInvestigationById(id);
  if (!investigation) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Investigation not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Investigation fetched successfully',
    data: investigation,
  });
});

const updateInvestigation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const investigation = await InvestigationService.updateInvestigation(
    id,
    payload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Investigation updated successfully',
    data: investigation,
  });
});

const deleteInvestigation = catchAsync(async (req, res) => {
  const { id } = req.params;
  await InvestigationService.deleteInvestigation(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Investigation deleted successfully',
  });
});

export const InvestigationController = {
  createInvestigation,
  getAllInvestigations,
  getInvestigationById,
  updateInvestigation,
  deleteInvestigation,
};
// ... existing code ...
