import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdviceTableService } from './adviceTable.service';


const createAdvice = catchAsync(async (req, res) => {
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };
  const payload = {
    ...req.body,
    doctorId: user.id
  };

  const advice = await AdviceTableService.createAdvice(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Advice created successfully',
    data: advice,
  });
});

const getAllAdvices = catchAsync(async (req, res) => {
  const user = {
    ...req.user,
    id: (req.user as any).id,
    type: (req.user as any).type,
  };
  const advices = await AdviceTableService.getAllAdvices(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Advices fetched successfully',
    data: advices,
  });
});

const getAdviceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const advice = await AdviceTableService.getAdviceById(id);
  if (!advice) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Advice not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Advice fetched successfully',
    data: advice,
  });
});

const updateAdvice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const advice = await AdviceTableService.updateAdvice(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Advice updated successfully',
    data: advice,
  });
});

const deleteAdvice = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdviceTableService.deleteAdvice(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Advice deleted successfully',
  });
});

export const AdviceTableController = {
  createAdvice,
  getAllAdvices,
  getAdviceById,
  updateAdvice,
  deleteAdvice,
};