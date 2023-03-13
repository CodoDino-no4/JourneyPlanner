import express from 'express';
import { body } from 'express-validator';
import { loginCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.post(
  '/',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .notEmpty()
      .withMessage('Must be a valid email'),
    body('password')
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      })
      .trim()
      .notEmpty()
      .withMessage('Must be a strong password'),
  ],
  validateRequest,
  loginCtrl
);

export { router as loginRouter };
