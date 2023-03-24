import { Request, Response } from 'express';
import { errorHandler, log } from '../middlewares';
import { Ticket } from '../schemas';

export const updateTicketCtrl = async (req: Request, res: Response) => {
  const { ticket_code } = req.query;

  const now = new Date(Date.now());
  const filter = { code: ticket_code };
  const update = { expires: now };
  const opts = { new: true };

  const ticket = await Ticket.findOneAndUpdate(filter, update, opts)
    .then((ticket) => {
      if (ticket === null) {
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

  res.status(200).json(ticket);
  log.info(req.baseUrl, 200);
};
