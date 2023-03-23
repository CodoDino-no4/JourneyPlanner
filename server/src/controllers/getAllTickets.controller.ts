import { Request, Response } from 'express';
import { errorHandler, log } from '../middlewares';
import { Ticket } from '../schemas';

export const getAllTicketsCtrl = async (req: Request, res: Response) => {
  await Ticket.find({})
    .then((tickets) => {
      if (tickets !== null) {
        res.status(200).json(tickets);
        log.info(req.baseUrl, 200);
      } else {
        throw errorHandler('Tickets not found', 400, req.baseUrl);
      }
    })
    .catch((err) => {
      if (err) {
        res
          .status(400)
          .json(errorHandler('Tickets not found', 400, req.baseUrl));
      }
    });
};
