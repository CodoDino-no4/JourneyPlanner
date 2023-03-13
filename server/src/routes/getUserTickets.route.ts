import express from 'express';
import { body } from 'express-validator';
import { getUserTicketsCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.get(
  '/',
  [body('user_id').isString().notEmpty().withMessage('Must be a valid userID')],
  validateRequest,
  getUserTicketsCtrl
);

export { router as getUserTicketsRouter };
