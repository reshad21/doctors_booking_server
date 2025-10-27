import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { PrescriptionHeaderService } from "./prescriptionHeader.service"

const deletePrescriptionHeader = catchAsync(async (req, res) => {
    await PrescriptionHeaderService.deletePrescriptionHeaderIntoDB(req.params.id)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "PrescriptionHeader deleted successfully",
    })
})

const getPrescriptionHeader = catchAsync(async (req, res) => {
    const result = await PrescriptionHeaderService.getPrescriptionHeaderById(req.params.id)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "PrescriptionHeader fetched successfully",
        data: result
    })
})

export const PrescriptionHeaderController = {
    deletePrescriptionHeader,
    getPrescriptionHeader,
}