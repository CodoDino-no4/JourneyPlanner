import { Request, Response } from 'express';
import { Ticket } from '../schemas/ticketSchema';
import { addHours } from 'date-fns';
import { ticketTypeEnum } from '../utils/ticketTypeEnum';
import { User } from '../schemas';
import { log, errorHandler } from '../middlewares';

export const addTicketCtrl = async (req: Request, res: Response) => {
  const { ticket_type, _id } = req.body;
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

  const codeGen = Math.floor(1000 + Math.random() * 9000);

  const user_id = await User.findById({ _id })
    .then((user) => {
      if (user !== null) {
        const id = user?._id.toHexString();
        return id;
      } else {
        throw errorHandler('User not found', 400, req.baseUrl);
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).json(errorHandler('User not found', 400, req.baseUrl));
      }
    });

  await Ticket.create({
    code: codeGen,
    created_on: Date.now(),
    ticket_type: ticket_type,
    ticket_price: price,
    expires: expiryDate,
    user: user_id,
  }).catch((err) => {
    if (err) {
      res.status(400).json(errorHandler(err, 400, req.baseUrl));
    }
  });
  res.status(200).json('Successfully created ticket');
  log.info('OK', 200, req.baseUrl);
};

// {
//     "ticket_type": "Month",
//     "user_email": "customer@localhost.com"
// }
