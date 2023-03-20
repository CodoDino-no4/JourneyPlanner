import type { Request, Response } from 'express';

import { CustomError } from '../errors';

export function errorHandler(err: Error, req: Request, res: Response) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);

  return res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
}

export default errorHandler;
