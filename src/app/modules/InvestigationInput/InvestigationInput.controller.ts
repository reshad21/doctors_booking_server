import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InvestigationInputService } from './InvestigationInput.service';

const createInvestigationInput = catchAsync(async (req, res) => {
  const response =
    await InvestigationInputService.createInvestigationInputIntoBD(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Investigation Input created successfully',
    data: response,
  });
});

const getAllInvestigationInputs = catchAsync(async (req, res) => {
  const response =
    await InvestigationInputService.getAllInvestigationInputsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Investigation Inputs retrieved successfully',
    data: response,
  });
});

const updateInvestigationInput = catchAsync(async (req, res) => {
  const response =
    await InvestigationInputService.updateInvestigationInputIntoDB(
      req.params.id,
      req.body,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Investigation Input updated successfully',
    data: response,
  });
});

const deleteInvestigationInput = catchAsync(async (req, res) => {
  const response =
    await InvestigationInputService.deleteInvestigationInputFromDB(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Investigation Input deleted successfully',
    data: response,
  });
});

const getInvestigationInputById = catchAsync(async (req, res) => {
  const response =
    await InvestigationInputService.getInvestigationInputByIdFromDB(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Investigation Input fetched successfully',
    data: response,
  });
});

export const InvestigationInputController = {
  createInvestigationInput,
  getAllInvestigationInputs,
  getInvestigationInputById,
  updateInvestigationInput,
  deleteInvestigationInput,
};
