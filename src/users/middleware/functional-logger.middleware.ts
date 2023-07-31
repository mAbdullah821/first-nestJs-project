import { Request, Response, NextFunction } from 'express';

export function functionalLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const { statusCode } = res;

    console.log(`Functional-Logger: ${method} ${originalUrl} ${statusCode}`);
  });
  next();
}
