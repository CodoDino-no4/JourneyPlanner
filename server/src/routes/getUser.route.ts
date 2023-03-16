import express from 'express';
import { getUserCtrl } from '../controllers';
import { param } from 'express-validator';
import { validateRequest } from '../middlewares';

const router = express.Router();

// Call the controller along with validators and middlewares
// '/' api url is not set here
router.get(
  '/',
  [
    param('user_id')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Must be a valid User ID'),
  ],
  validateRequest,
  getUserCtrl
);

export { router as getUserRouter };
