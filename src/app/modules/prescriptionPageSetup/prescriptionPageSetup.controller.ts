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
  const headerSection = JSON.parse(req.body.headerSection);

  const payload = {
    pageSetup,
    patientSection,
    bodySection,
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

export const PrescriptionPageSetupController = {
  createPrescriptionPageSetup,
};
