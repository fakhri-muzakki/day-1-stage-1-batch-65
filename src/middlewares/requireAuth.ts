import { Request, Response, NextFunction } from 'express';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user) {
    req.flash('error', 'Please login to continue.');
    return res.redirect('/login');
  }

  next();
};
