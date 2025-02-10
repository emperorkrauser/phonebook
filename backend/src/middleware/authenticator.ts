import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: string | Record<string, unknown>;
  req: AuthenticatedRequest;
}

const SECRET_KEY = process.env.SECRET_KEY as string;
export const authenticator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req?.headers?.authorization?.split(' ')[1]
    ? req?.headers?.authorization?.split(' ')[1]
    : req?.headers?.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized access. Token not found.',
    });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req = { ...req, user: verified } as AuthenticatedRequest;
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid token.',
    });
  }
};
