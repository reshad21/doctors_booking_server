import fs from 'fs';

export const removeFile = (filePath: string): void => {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`File removed: ${filePath}`);
    } catch (err) {
      console.error(`Error removing file: ${filePath}`, err);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
};
