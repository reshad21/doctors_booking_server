import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WatchVideoServices } from './watchVideo.service';

const createWatchVideoController = catchAsync(async (req, res) => {
    const response = await WatchVideoServices.createWatchVideoIntoDB(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Watch Video created successfully',
        data: response,
    });
});

const getWatchVideoController = catchAsync(async (req, res) => {
    const response = await WatchVideoServices.getWatchVideoFromDB();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Watch Video fetched successfully',
        data: response,
    });
});

const getWatchVideoByIdController = catchAsync(async (req, res) => {
    const response = await WatchVideoServices.getWatchVideoByIdFromDB(
        req.params.id,
    );
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Watch Video fetched successfully',
        data: response,
    });
});


const deleteWatchVideoByIdController = catchAsync(async (req, res) => {
    const response = await WatchVideoServices.deleteWatchVideoByIdFromDB(
        req.params.id,
    );
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Watch Video deleted successfully',
        data: response,
    });
});


const updateWatchVideoByIdController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const response = await WatchVideoServices.updateWatchVideoByIdFromDB(id, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Watch Video updated successfully',
        data: response,
    });
});


const getOnlyActiveVideo = catchAsync(async (req, res) => {
    const response = await WatchVideoServices.getOnlyActiveVideoFromDB();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Watch Video fetched successfully',
        data: response,
    });
});

export const WatchVideoController = {
    createWatchVideoController,
    getWatchVideoController,
    getWatchVideoByIdController,
    deleteWatchVideoByIdController,
    updateWatchVideoByIdController,
    getOnlyActiveVideo
};
