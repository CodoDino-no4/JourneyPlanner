import express from 'express';
import { query } from 'express-validator';
import { updateTicketCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

router.patch(
  '/',
  [
    query('ticket_code')
      .isNumeric()
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 4 })
      .withMessage('Must be a valid ticket code'),
  ],
  validateRequest,
  updateTicketCtrl
);

export { router as updateTicketRouter };
