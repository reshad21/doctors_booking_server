import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import verifyToken from '../utils/verifyToken';
import prisma from '../../db/db.config';
import { UserType } from '../context/userType';

const auth = (allowedTypes: string[] = []) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: 'Unauthorized access',
      });
    }

    const decodedToken = (await verifyToken(
      token,
      process.env.JWT_SECRET as string,
    )) as JwtPayload & {
      id: string;
      email: string;
      type: 'DOCTOR' | 'STAFF';
    };

    // Check if the user type is allowed for this route
    if (allowedTypes.length && !allowedTypes.includes(decodedToken.type)) {
      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: 'Forbidden: You do not have access to this resource',
      });
    }

    // Optional: check if the user actually exists in the DB
    if (decodedToken.type === UserType.DOCTOR) {
      await prisma.doctor.findUniqueOrThrow({
        where: { id: decodedToken.id },
      });
    } else if (decodedToken.type === UserType.STAFF) {
      await prisma.staff.findUniqueOrThrow({
        where: { id: decodedToken.id },
      });
    }

    req.user = decodedToken;
    next();
  });
};

export default auth;
