/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { NextFunction } from 'express';
import fs from 'fs'
import { ACCEPTED_FILE_TYPES, ACCEPTED_IMAGE_TYPES } from '../utils/constant';

// ✅ Ensure upload directories exist
const ensureUploadDirs = () => {
  const imageDir = path.join(process.cwd(), 'public', 'images');
  const fileDir = path.join(process.cwd(), 'public', 'files');

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }
};

// ✅ Call it once when this file is imported
ensureUploadDirs();

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const imageStorage = multer.memoryStorage(); // Store images in memory for processing

// Filter function to accept only specific mimetypes for files
const fileFilter = function (req: any, file: any, cb: any) {
  if (ACCEPTED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

// Filter function to accept only specific mimetypes for images
const imageFilter = function (req: any, file: any, cb: any) {
  if (ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
    cb(null, true); // Accept image
  } else {
    cb(new Error('Unsupported image type'), false);
  }
};

// multer instance for file uploads
export const fileUpload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});

// multer instance for image uploads
export const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
});

export const uploadImages = async (req: any, res: any, next: NextFunction) => {
  try {
    if (!req.files && !req.file) {
      return next();
    }

    const processFile = async (file: Express.Multer.File) => {
      const timestamp = Date.now();
      const filename = `${file.fieldname}-${timestamp}-${Math.round(Math.random() * 1e9)}.webp`;
      const outputPath = path.join(process.cwd(), 'public', 'images', filename);

      await sharp(file.buffer)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

      return filename;
    };

    if (req.files) {
      // Handle multiple files
      for (const field of Object.keys(req.files)) {
        const files = req.files[field];
        if (Array.isArray(files)) {
          for (const file of files) {
            file.filename = await processFile(file);
          }
        }
      }
    } else if (req.file) {
      // Handle single file
      req.file.filename = await processFile(req.file);
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Image processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing the images',
    });
  }
};
