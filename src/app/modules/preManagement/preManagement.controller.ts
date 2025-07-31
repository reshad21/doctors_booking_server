import configs from '../../configs';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PreManagementServices } from './preManagement.service';

const createPreManagementController = catchAsync(async (req, res) => {
  const files = req.files as { [key: string]: Express.Multer.File[] };

  const headerImage = files['headerImage']
    ? `${configs.serverUrl}/images/${files['headerImage'][0].filename}`
    : null;
  const footerImage = files['footerImage']
    ? `${configs.serverUrl}/images/${files['footerImage'][0].filename}`
    : null;

  const payload = {
    ...req.body,
    headerImage,
    footerImage,
  };

  const response =
    await PreManagementServices.createPreManagementIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Pre Management created successfully',
    data: response,
  });
});

const getPreManagementController = catchAsync(async (req, res) => {
  const response = await PreManagementServices.getPreManagementFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Pre Management fetched successfully',
    data: response,
  });
});

const getPreManagementByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await PreManagementServices.getPreManagementByIdFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Pre Management fetched successfully',
    data: response,
  });
});

const deletePreManagementController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await PreManagementServices.deletePreManagementFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Pre Management deleted successfully',
    data: response,
  });
});

const updatePreManagementByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const response = await PreManagementServices.updatePreManagementByIdFromDB(
    id,
    payload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Pre Management updated successfully',
    data: response,
  });
});

export const PreManagementController = {
  createPreManagementController,
  getPreManagementController,
  getPreManagementByIdController,
  deletePreManagementController,
  updatePreManagementByIdController,
};
