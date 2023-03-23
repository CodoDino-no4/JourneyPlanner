import express from 'express';
import { query } from 'express-validator';
import { checkValidityCtrl } from '../controllers';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.get(
  '/',
  [
    query('ticket_code')
      .isNumeric()
      .trim()
      .notEmpty()
      .withMessage('Must be a ticket code for an exisiting ticket'),
  ],
  checkValidityCtrl
);

export { router as checkValidityRouter };
