import { Request, Response } from 'express';

export const getAllUsersCtrl = (req: Request, res: Response) => {
  res.json('get all users');
};
