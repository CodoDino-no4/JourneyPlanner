import { Request, Response } from 'express';
import { NotFoundError } from '../errors';
import { Ticket } from '../schemas';

export const checkValidityCtrl = async (req: Request, res: Response) => {
  const { ticket_code } = req.params;

  await Ticket.findOne({ code: ticket_code })
    .then((ticket) => {
      console.log(ticket);
      if (ticket !== null) {
        res.json(ticket);
      } else {
        throw new NotFoundError();
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: 'Ticket not found', err });
        console.log(err);
      }
    });
};
