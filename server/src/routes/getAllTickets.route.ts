import express from 'express';
import { getAllTicketsCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.get('/', validateRequest, getAllTicketsCtrl);

export { router as getAllTicketsRouter };
