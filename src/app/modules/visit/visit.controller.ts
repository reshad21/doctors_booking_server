import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VisitService } from './visit.service';

const createVisit = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = {
    ...req.user,
    id: req.user?.id,
    type: req.user?.type,
  };

  const visit = await VisitService.createVisit(payload, user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Visit created successfully',
    data: visit,
  });
});

const getAllVisits = catchAsync(async (req, res) => {
  const visits = await VisitService.getAllVisits(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Visits fetched successfully',
    data: visits,
  });
});

const getVisitById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const visit = await VisitService.getVisitById(id);
  if (!visit) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Visit not found',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Visit fetched successfully',
    data: visit,
  });
});

const updateVisit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const visit = await VisitService.updateVisit(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Visit updated successfully',
    data: visit,
  });
});

const deleteVisit = catchAsync(async (req, res) => {
  const { id } = req.params;
  await VisitService.deleteVisit(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Visit deleted successfully',
    data: null,
  });
});

export const VisitController = {
  createVisit,
  getAllVisits,
  getVisitById,
  updateVisit,
  deleteVisit,
};
