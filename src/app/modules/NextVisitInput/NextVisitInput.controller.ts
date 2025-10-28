import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NextVisitInputService } from './NextVisitInput.service';

const createNextVisitInput = catchAsync(async (req, res) => {
  const response = await NextVisitInputService.createNextVisitInputIntoBD(
    req.body,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Next Visit Input created successfully',
    data: response,
  });
});

const getAllNextVisitInputs = catchAsync(async (req, res) => {
  const response = await NextVisitInputService.getAllNextVisitInputsFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Next Visit Inputs retrieved successfully',
    data: response,
  });
});

const updateNextVisitInput = catchAsync(async (req, res) => {
  const response = await NextVisitInputService.updateNextVisitInputIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Next Visit Input updated successfully',
    data: response,
  });
});

const deleteNextVisitInput = catchAsync(async (req, res) => {
  const response = await NextVisitInputService.deleteNextVisitInputFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Next Visit Input deleted successfully',
    data: response,
  });
});

const getNextVisitInputById = catchAsync(async (req, res) => {
  const response = await NextVisitInputService.getNextVisitInputByIdFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Next Visit Input fetched successfully',
    data: response,
  });
});

export const NextVisitInputController = {
  createNextVisitInput,
  getAllNextVisitInputs,
  getNextVisitInputById,
  updateNextVisitInput,
  deleteNextVisitInput,
};
