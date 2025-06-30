export type TLogin = {
  email: string;
  password: string;
};

export type TJwtPayload = {
  email: string;
  name: string;
  status: string;
  id?: string;
};