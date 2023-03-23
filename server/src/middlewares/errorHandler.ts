import { log } from './logger';

const errorHandler = (err: string, status: number, req: string) => {
  log.error(err, status, req);
};

export { errorHandler };
