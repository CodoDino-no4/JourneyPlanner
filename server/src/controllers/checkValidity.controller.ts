import { Request, Response } from 'express';
import { Ticket } from '../schemas';
import { errorHandler, log } from '../middlewares';

export const checkValidityCtrl = async (req: Request, res: Response) => {
  const { ticket_code } = req.params;

  await Ticket.findOne({ code: ticket_code })
    .then((ticket) => {
      console.log(ticket);
      if (ticket !== null) {
        res.status(200).json(ticket);
        log.info(req.baseUrl, 200);
      } else {
        throw errorHandler('Ticket not found', 400, res);
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).json(errorHandler('Ticket not found', 400, res));
      }
    });
};
