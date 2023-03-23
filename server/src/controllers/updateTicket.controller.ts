import { NextFunction, Request, Response } from 'express';
import { errorHandler, log } from '../middlewares';
import { Ticket } from '../schemas';

export const updateTicketCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ticket_code } = req.body;

  await Ticket.findOne({ code: ticket_code })
    .then((ticket) => {
      console.log(ticket);
      if (ticket !== null) {
        const now = new Date(Date.now());
        ticket.expires = now;
        res.status(200).json(ticket);
        log.info(req.baseUrl, 200);
      } else {
        throw errorHandler('Ticket not found', 400, req.baseUrl);
      }
    })
    .catch((err) => {
      if (err) {
        res
          .status(400)
          .json(errorHandler('Ticket not found', 400, req.baseUrl));
      }
    });
};
