import { type Request, type Response, type NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error ke console
  console.error('Error terjadi:', err.message);

  // Kirim response ke client
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Terjadi kesalahan di server',
    // Hanya tampilkan stack trace saat development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} tidak ditemukan`,
  });
};
