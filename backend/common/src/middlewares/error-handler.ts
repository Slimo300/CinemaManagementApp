import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }
  console.error(err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
