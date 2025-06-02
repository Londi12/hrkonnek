import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export const adminAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin') {
      throw new Error();
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Admin access required' });
  }
};
