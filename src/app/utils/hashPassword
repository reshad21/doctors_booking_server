import bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string, saltRounds: number) => {
  return await bcryptjs.hash(password, saltRounds);
};
