import { Request, Response } from 'express';
import { errorHandler, log } from '../middlewares';
import { Ticket } from '../schemas';

export const getUserTicketsCtrl = async (req: Request, res: Response) => {
  const { user_id } = req.query;

  await Ticket.find({ user_id: user_id })
    .then((tickets) => {
      if (tickets !== null) {
        res.status(200).json(tickets);
        log.info(req.baseUrl, 200);
      } else {
        throw errorHandler('User not found', 400, req.baseUrl);
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).json(errorHandler('User not found', 400, req.baseUrl));
      }
    });
};
