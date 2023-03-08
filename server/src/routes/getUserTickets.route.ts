import express from 'express';
import { getUserTicketsCtrl } from '../controllers';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.get('/', getUserTicketsCtrl);

export { router as getUserTicketsRouter };
