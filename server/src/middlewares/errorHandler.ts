import type { Response } from 'express';
import { log } from './logger';

const errorHandler = (err: string, status: number, res: Response) => {
  if (status === 500) {
    return res.status(500).json({
      error: [{ message: 'Something went wrong' }],
    });
  }

  log.error(
    res.status(status).send({ error: err, code: status, response: res })
  );

  return {
    error: err,
    code: status,
    response: res,
  };
};

export { errorHandler };
