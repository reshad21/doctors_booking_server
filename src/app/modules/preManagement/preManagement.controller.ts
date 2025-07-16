import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PreManagementServices } from "./preManagement.service";

const createPreManagementController = catchAsync(async (req, res) => {
    const response = await PreManagementServices.createPreManagementIntoDB(req.body);
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


export const PreManagementController = {
    createPreManagementController,
    getPreManagementController,
};