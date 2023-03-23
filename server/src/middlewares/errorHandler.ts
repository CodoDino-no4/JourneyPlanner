import { log } from './logger';

export const errorHandler = (err: string, status: number, url: string) => {
  log.error({ error: err, status: status, url: url });
  return {
    error: err,
    status: status,
    url: url,
  };
};
