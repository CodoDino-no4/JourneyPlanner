import { Request, Response } from 'express';

export const checkValidityCtrl = (req: Request, res: Response) => {
  res.json('Check if valid');
};
