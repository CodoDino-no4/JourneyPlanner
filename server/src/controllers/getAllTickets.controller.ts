import { Request, Response } from 'express';

export const getAllTicketsCtrl = (req: Request, res: Response) => {
  res.json('get all tickets');
};
