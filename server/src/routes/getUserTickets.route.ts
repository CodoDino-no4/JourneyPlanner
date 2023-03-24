import express from 'express';
import { query } from 'express-validator';
import { getUserTicketsCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

router.get(
  '/',
  [
    query('user_id')
      .trim()
      .isAlphanumeric()
      .isString()
      .notEmpty()
      .withMessage('Must be a valid user ID'),
  ],
  validateRequest,
  getUserTicketsCtrl
);

export { router as getUserTicketsRouter };
