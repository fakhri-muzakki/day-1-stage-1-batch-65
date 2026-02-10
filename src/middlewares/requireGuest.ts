import { Request, Response, NextFunction } from 'express';

export const requireGuest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user) {
    req.flash('error', 'You are logged in.');
    return res.redirect('/');
  }

  next();
};
