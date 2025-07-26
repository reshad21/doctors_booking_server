import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`📥 [${req.method}] ${req.originalUrl}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Query:', req.query);
    console.log('Params:', req.params);
    next();
};
