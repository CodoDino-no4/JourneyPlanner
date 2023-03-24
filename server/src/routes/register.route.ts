import express from 'express';
import { registerCtrl } from '../controllers';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares';

const router = express.Router();

// Call the controller along with validators and middlewares
// '/' api url is not set here
router.post(
  '/',
  [
    body('first_name')
      .isString()
      .isAlphanumeric()
      .trim()
      .isLength({ min: 1, max: 20 })
      .notEmpty()
      .withMessage('First name must be a string of 20 characters or less'),
    body('second_name')
      .isString()
      .isAlphanumeric()
      .trim()
      .isLength({ min: 1, max: 20 })
      .notEmpty()
      .withMessage('Last name must be a string of 20 characters or less'),
    body('email')
      .isEmail()
      .isAlphanumeric()
      .normalizeEmail()
      .notEmpty()
      .withMessage('Must be a valid email'),
    body('password')
      .isAlphanumeric()
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
    body('user_type')
      .isAlphanumeric()
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Must be a valid user type'),
  ],
  validateRequest,
  registerCtrl
);

export { router as registerRouter };
