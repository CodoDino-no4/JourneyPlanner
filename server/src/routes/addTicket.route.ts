import express from 'express';
import { body } from 'express-validator';
import { addTicketCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

router.post(
  '/',
  [
    body('ticket_type')
      .isString()
      .isAlphanumeric()
      .trim()
      .notEmpty()
      .isLength({ min: 3, max: 5 })
      .withMessage('Must be a valid ticket type'),
    body('_id')
      .isString()
      .isAlphanumeric()
      .trim()
      .notEmpty()
      .isLength({ min: 20, max: 30 })
      .withMessage('Must be a valid email registered on the system'),
  ],
  validateRequest,
  addTicketCtrl
);

export { router as addTicketRouter };

// {
//     "ticket_type": "Day",
//     "user_email": "customer@journeyplanner.com"
// }
