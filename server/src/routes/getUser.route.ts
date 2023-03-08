import express from 'express';
import { getUserCtrl } from '../controllers';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.get('/', getUserCtrl);

export { router as getUserRouter };
