import type { Response } from 'express';
import { log } from './logger';

const errorHandler = (err: string, status: number, res: Response) => {
  log.error(err, status, res);

  if (status === 500) {
    return res.status(500).json({
      error: [{ message: 'Something went wrong' }],
    });
  }

  return {
    error: err,
    code: status,
    response: res,
  };
};

export { errorHandler };
