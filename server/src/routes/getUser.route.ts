import express from 'express';
import { getUserCtrl } from '../controllers';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares';

const router = express.Router();

// Call the controller along with validators and middlewares
// '/' api url is not set here
router.get(
  '/',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .notEmpty()
      .withMessage('Must be a valid email'),
  ],
  validateRequest,
  getUserCtrl
);

export { router as getUserRouter };
