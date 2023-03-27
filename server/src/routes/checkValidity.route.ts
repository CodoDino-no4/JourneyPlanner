import express from 'express';
import { query } from 'express-validator';
import { checkValidityCtrl } from '../controllers';

const router = express.Router();

router.get(
  '/',
  [
    query('ticket_code')
      .isNumeric()
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 4 })
      .withMessage('Must be a ticket code for an exisiting ticket'),
  ],
  checkValidityCtrl
);

export { router as checkValidityRouter };
