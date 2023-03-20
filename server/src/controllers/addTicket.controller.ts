import { Request, Response } from 'express';
import { Ticket } from '../schemas/ticketSchema';
import { addHours } from 'date-fns';
import { ticketTypeEnum } from '../utils/ticketTypeEnum';
import { User } from '../schemas';
import { log, errorHandler } from '../middlewares';

export const addTicketCtrl = async (req: Request, res: Response) => {
  const { ticket_type, user_email } = req.body;
  let expiry = 0;
  let price = 0;

  if (ticket_type === ticketTypeEnum.DAY) {
    expiry = 24;
    price = 4.0;
  }
  if (ticket_type === ticketTypeEnum.WEEK) {
    expiry = 24 * 7;
    price = 12.0;
  }
  if (ticket_type === ticketTypeEnum.MONTH) {
    expiry = 24 * 31;
    price = 38.0;
  }

  const expiryDate = addHours(Date.now(), expiry);

  const codeGen = Math.floor(100000 + Math.random() * 900000);

  const user_id = await User.findOne({ email: user_email }, '_id')
    .then((user) => {
      if (user !== null) {
        const id = user?._id.toHexString();
        log.info(req.baseUrl);
        return id;
      } else {
        throw errorHandler('User not found', 404, res);
      }
    })
    .catch((err) => {
      if (err) {
        res.status(404).json(errorHandler('User not found', 404, res));
      }
    });

  await Ticket.create({
    code: codeGen,
    created_on: Date.now(),
    ticket_type: ticket_type,
    expires: expiryDate,
    price: price,
    user: user_id,
  }).catch((err) => {
    if (err) {
      res.status(400).json(errorHandler('Error creating ticket', 404, res));
      log.error(req.baseUrl, errorHandler('Error creating ticket', 404, res));
    }

    res.status(200).json('Successfully created ticket');
    log.info(req.baseUrl, 200);
  });
};
