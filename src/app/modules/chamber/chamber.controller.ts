/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChamberService } from './chamber.service';

const createChamber = catchAsync(async (req, res) => { 
  const payload = req.body;
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };

  const chamber = await ChamberService.createChamber(payload, user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Chamber created successfully',
    data: chamber,
  });
});

const getAllChambers = catchAsync(async (req, res) => {
  const chambers = await ChamberService.getAllChambers(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Chambers fetched successfully',
    data: chambers,
  });
});

const getChamberById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const chamber = await ChamberService.getChamberById(id);
  if (!chamber) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Chamber not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Chamber fetched successfully',
    data: chamber,
  });
});

const updateChamber = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const chamber = await ChamberService.updateChamber(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Chamber updated successfully',
    data: chamber,
  });
});

const deleteChamber = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ChamberService.deleteChamber(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Chamber deleted successfully',
  });
});

export const ChamberController = {
  createChamber,
  getAllChambers,
  getChamberById,
  updateChamber,
  deleteChamber,
};
