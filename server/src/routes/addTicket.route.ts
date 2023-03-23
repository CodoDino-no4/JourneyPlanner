import express from 'express';
import { body } from 'express-validator';
import { addTicketCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.post(
  '/',
  [
    body('ticket_type')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Must be a valid ticket type'),
    body('user_email')
      .isEmail()
      .trim()
      .normalizeEmail()
      .notEmpty()
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
