import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CoMorbiditiesInputService } from './CoMorbiditiesInput.service';

const createCoMorbiditiesInput = catchAsync(async (req, res) => {
  const response =
    await CoMorbiditiesInputService.createCoMorbiditiesInputIntoBD(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Co-Morbidities Input created successfully',
    data: response,
  });
});

const getAllCoMorbiditiesInputs = catchAsync(async (req, res) => {
  const response =
    await CoMorbiditiesInputService.getAllCoMorbiditiesInputsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Co-Morbidities Inputs retrieved successfully',
    data: response,
  });
});

const updateCoMorbiditiesInput = catchAsync(async (req, res) => {
  const response =
    await CoMorbiditiesInputService.updateCoMorbiditiesInputIntoDB(
      req.params.id,
      req.body,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Co-Morbidities Input updated successfully',
    data: response,
  });
});

const deleteCoMorbiditiesInput = catchAsync(async (req, res) => {
  const response =
    await CoMorbiditiesInputService.deleteCoMorbiditiesInputFromDB(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Co-Morbidities Input deleted successfully',
    data: response,
  });
});

const getCoMorbiditiesInputById = catchAsync(async (req, res) => {
  const response =
    await CoMorbiditiesInputService.getCoMorbiditiesInputByIdFromDB(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Co-Morbidities Input fetched successfully',
    data: response,
  });
});

export const CoMorbiditiesInputController = {
  createCoMorbiditiesInput,
  getAllCoMorbiditiesInputs,
  getCoMorbiditiesInputById,
  updateCoMorbiditiesInput,
  deleteCoMorbiditiesInput,
};

