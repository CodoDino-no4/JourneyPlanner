import express from 'express';
import { registerCtrl } from '../controllers';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.post('/', registerCtrl);

export { router as registerRouter };
