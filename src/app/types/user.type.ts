import { JwtPayload } from 'jsonwebtoken';

export type User = JwtPayload & { id: string; type: string ,doctorId?:string};
