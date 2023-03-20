import { Request, Response } from 'express';
import { NotFoundError } from '../errors';
import { Ticket } from '../schemas';

export const getUserTicketsCtrl = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  await Ticket.find({ user_id: user_id })
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
