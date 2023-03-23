import express from 'express';
import { query } from 'express-validator';
import { updateTicketCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.patch(
  '/',
  [
    query('ticket_code')
      .isNumeric()
      .trim()
      .notEmpty()
      .withMessage('Must be a valid email'),
  ],
  validateRequest,
  updateTicketCtrl
);

export { router as updateTicketRouter };
