import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdviceInputService } from './AdviceInput.service';

const createAdviceInput = catchAsync(async (req, res) => {
  const response = await AdviceInputService.createAdviceInputIntoBD(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Advice Input created successfully',
    data: response,
  });
});

const getAllAdviceInputs = catchAsync(async (req, res) => {
  const response = await AdviceInputService.getAllAdviceInputsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Advice Inputs retrieved successfully',
    data: response,
  });
});

const updateAdviceInput = catchAsync(async (req, res) => {
  const response = await AdviceInputService.updateAdviceInputIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Advice Input updated successfully',
    data: response,
  });
});

const deleteAdviceInput = catchAsync(async (req, res) => {
  const response = await AdviceInputService.deleteAdviceInputFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Advice Input deleted successfully',
    data: response,
  });
});

const getAdviceInputById = catchAsync(async (req, res) => {
  const response = await AdviceInputService.getAdviceInputByIdFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Advice Input fetched successfully',
    data: response,
  });
});

export const AdviceInputController = {
  createAdviceInput,
  getAllAdviceInputs,
  getAdviceInputById,
  updateAdviceInput,
  deleteAdviceInput,
};
