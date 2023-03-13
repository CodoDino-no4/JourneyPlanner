import express from 'express';
import { body } from 'express-validator';
import { checkValidityCtrl } from '../controllers';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.get(
  '/',
  [
    body('ticket_id')
      .isString()
      .notEmpty()
      .withMessage('Must be a valid ticket ID'),
  ],
  checkValidityCtrl
);

export { router as checkValidityRouter };
