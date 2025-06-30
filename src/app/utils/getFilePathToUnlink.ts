export const getFilePathToUnlink = (file: string) => {
  const getFileName = file.substring(file.lastIndexOf('/') + 1);
  const fileToUnlink = `public\\files\\${getFileName}`;
  return fileToUnlink;
};

export const getImagePathToUnlink = (file: string) => {
  const getFileName = file.substring(file.lastIndexOf('/') + 1);
  const imageToUnlink = `public\\images\\${getFileName}`;
  return imageToUnlink;
};
