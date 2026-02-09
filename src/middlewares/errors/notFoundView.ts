import { Request, Response, NextFunction } from 'express';

// middlewares/error/notFoundView.ts
export const notFoundView = (req: Request, res: Response) => {
  res.status(404).render('pages/404', {
    layout: 'layouts/main',
  });
};
