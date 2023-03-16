import { Request, Response } from 'express';
import { NotFoundError } from '../errors';
import { Ticket } from '../schemas';

export const getAllTicketsCtrl = async (req: Request, res: Response) => {
  await Ticket.find({})
    .then((tickets) => {
      if (tickets !== null) {
        res.json(tickets);
      } else {
        throw new NotFoundError();
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: 'User not found', err });
        console.log(err);
      }
    });
};
