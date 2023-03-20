import { Request, Response } from 'express';
import { NotFoundError } from '../errors';
import { Ticket } from '../schemas';

export const updateTicketCtrl = async (req: Request, res: Response) => {
  const { ticket_code } = req.body;

  await Ticket.findOne({ code: ticket_code })
    .then((ticket) => {
      console.log(ticket);
      if (ticket !== null) {
        const now = new Date(Date.now());
        ticket.expires = now;
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
