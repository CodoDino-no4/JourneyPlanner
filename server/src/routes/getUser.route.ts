import express from 'express';
import { getUserCtrl } from '../controllers';
import { query } from 'express-validator';
import { validateRequest } from '../middlewares';

const router = express.Router();

router.get(
  '/',
  [
    query('_id')
      .isString()
      .isAlphanumeric()
      .trim()
      .notEmpty()
      .isLength({ min: 20, max: 30 })
      .withMessage('Must be a valid User ID'),
  ],
  validateRequest,
  getUserCtrl
);

export { router as getUserRouter };
