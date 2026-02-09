// middlewares/error/viewErrorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const viewErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  res.status(500).render('pages/error', {
    layout: 'layouts/main',
    message: 'Something went wrong',
  });
};
