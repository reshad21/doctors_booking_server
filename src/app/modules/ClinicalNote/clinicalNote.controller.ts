import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClinicalNoteTemplateService } from './clinicalNote.service';

const createClinicalNote = catchAsync(async (req, res) => {
  const response = await ClinicalNoteTemplateService.createClinicalNote(
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Created Clinical Notes Template successfully!',
    data: response,
  });
});

const getClinicalNote = catchAsync(async (req, res) => {
  const response = await ClinicalNoteTemplateService.getClinicalNote();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Clinical notes template successfully!',
    data: response,
  });
});

const updateClinicalNote = catchAsync(async (req, res) => {
  const response = await ClinicalNoteTemplateService.updateClinicalNote(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update Clinical notes template successfully!',
    data: response,
  });
});

export const ClinicalNoteTemplateController = {
  createClinicalNote,
  getClinicalNote,
  updateClinicalNote,
};
