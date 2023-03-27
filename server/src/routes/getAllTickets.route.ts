import express from 'express';
import { getAllTicketsCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

router.get('/', validateRequest, getAllTicketsCtrl);

export { router as getAllTicketsRouter };
