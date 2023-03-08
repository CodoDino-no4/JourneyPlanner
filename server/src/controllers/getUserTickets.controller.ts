import { Request, Response } from 'express';

export const getUserTicketsCtrl = (req: Request, res: Response) => {
  res.json('get user tickets');
};
