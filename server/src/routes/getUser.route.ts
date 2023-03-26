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
      .withMessage('Must be a valid User ID'), //641096d20a26d93d9f562f3d
  ],
  validateRequest,
  getUserCtrl
);

export { router as getUserRouter };
