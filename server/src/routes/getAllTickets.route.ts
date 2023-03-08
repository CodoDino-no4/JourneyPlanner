import express from 'express';
import { getAllTicketsCtrl } from '../controllers';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.get('/', getAllTicketsCtrl);

export { router as getAllTicketsRouter };
