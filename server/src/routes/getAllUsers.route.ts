import express from 'express';
import { getAllUsersCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

router.get('/', validateRequest, getAllUsersCtrl);

export { router as getAllUsersRouter };
