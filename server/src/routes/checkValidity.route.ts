import express from 'express';
import { param } from 'express-validator';
import { checkValidityCtrl } from '../controllers';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.get(
  '/',
  [
    param('ticket_code')
      .isNumeric()
      .trim()
      .notEmpty()
      .withMessage('Must be a ticket code for an exisiting ticket'),
  ],
  checkValidityCtrl
);

export { router as checkValidityRouter };
