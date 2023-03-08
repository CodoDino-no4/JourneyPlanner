import { Request, Response } from 'express';

export const loginCtrl = (req: Request, res: Response) => {
  res.json('login');
};
