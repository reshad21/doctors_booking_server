import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { PrescriptionPageSetupService } from './prescriptionPageSetup.service';

const createPrescriptionPageSetup = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const pageSetup = JSON.parse(req.body.pageSetup);
  const patientSection = JSON.parse(req.body.patientSection);
  const bodySection = JSON.parse(req.body.bodySection);
  const footerSection = JSON.parse(req.body.footerSection);
  const doctorId = JSON.parse(req.body.doctorId);
  const chamberId = JSON.parse(req.body.chamberId);
  const headerSection = JSON.parse(req.body.headerSection);

  const payload = {
    pageSetup,
    patientSection,
    bodySection,
    doctorId,
    chamberId,
    footerSection: {
      ...footerSection,
      logo: files?.headerLogo[0]
        ? getSingleImageUrl(req, files?.headerLogo[0])
        : null,
    },
    headerSection: {
      ...headerSection,
      logo: files?.headerLogo[0]
        ? getSingleImageUrl(req, files?.headerLogo[0])
        : null,
    },
  };

  const response =
    await PrescriptionPageSetupService.createPrescriptionPageSetupIntoDB(
      payload,
    );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Prescription Page Setup created successfully',
    data: response,
  });
});

const updatePrescriptionPageSetup = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const pageSetup = JSON.parse(req.body.pageSetup);
  const patientSection = JSON.parse(req.body.patientSection);
  const bodySection = JSON.parse(req.body.bodySection);
  const footerSection = JSON.parse(req.body.footerSection);
  const doctorId = JSON.parse(req.body.doctorId);
  const chamberId = JSON.parse(req.body.chamberId);
  const headerSection = JSON.parse(req.body.headerSection);

  const payload = {
    pageSetup,
    patientSection,
    bodySection,
    doctorId,
    chamberId,
    footerSection: {
      ...footerSection,
      logo: files?.footerLogo?.[0]
        ? getSingleImageUrl(req, files?.footerLogo[0])
        : footerSection.logo || null,
    },
    headerSection: {
      ...headerSection,
      logo: files?.headerLogo?.[0]
        ? getSingleImageUrl(req, files?.headerLogo[0])
        : headerSection.logo || null,
    },
  };

  const response =
    await PrescriptionPageSetupService.updatePrescriptionPageSetupInDB(
      req.params.id,
      payload,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Prescription Page Setup updated successfully',
    data: response,
  });
});

const getPrescriptionPageSetupAll = catchAsync(async (req, res) => {
  const response =
    await PrescriptionPageSetupService.getPrescriptionPageSetupAll(
      req.query.doctorId as string,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Prescription Page Setup fetched successfully',
    data: response,
  });
});

const getPrescriptionPageSetup = catchAsync(async (req, res) => {
  const response = await PrescriptionPageSetupService.getPrescriptionPageSetup(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Prescription Page Setup single fetched successfully',
    data: response,
  });
});

const deletePrescriptionPageSetup = catchAsync(async (req, res) => {
  const response =
    await PrescriptionPageSetupService.deletePrescriptionPageSetup(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delete Successfully',
    data: response,
  });
});

const updateStatus = catchAsync(async (req, res) => {
  const response = await PrescriptionPageSetupService.updateStatus(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update Status Successfully',
    data: response,
  });
});

export const PrescriptionPageSetupController = {
  createPrescriptionPageSetup,
  updatePrescriptionPageSetup,
  getPrescriptionPageSetupAll,
  getPrescriptionPageSetup,
  deletePrescriptionPageSetup,
  updateStatus,
};
