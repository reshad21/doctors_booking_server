import { ClinicalNote, ClinicalNotesTemplate } from '@prisma/client';
import prisma from '../../../db/db.config';

interface IMajor extends ClinicalNotesTemplate {
  notes: ClinicalNote[];
}

const createClinicalNote = async (payload: IMajor) => {
  const response = await prisma.clinicalNotesTemplate.create({
    data: {
      doctorId: payload.doctorId,
      notes: {
        create: payload.notes.map((n) => ({
          order: n.order,
          category: n.category,
          title: n.title,
        })),
      },
    },
  });

  return response;
};

const getClinicalNote = async () => {
  const response = await prisma.clinicalNotesTemplate.findFirstOrThrow({
    include: { notes: true },
  });

  return response;
};

const updateClinicalNote = async (payload: Partial<IMajor>) => {
  const existingClinicalTemplate =
    await prisma.clinicalNotesTemplate.findFirstOrThrow({
      include: { notes: true },
    });
  const response = await prisma.clinicalNotesTemplate.update({
    where: {
      id: existingClinicalTemplate.id,
    },
    data: {
      notes: {
        deleteMany: {},
        create: payload?.notes?.map((n) => ({
          order: n.order,
          category: n.category,
          title: n.title,
        })),
      },
    },
  });

  return response;
};

export const ClinicalNoteTemplateService = {
  createClinicalNote,
  getClinicalNote,
  updateClinicalNote,
};
