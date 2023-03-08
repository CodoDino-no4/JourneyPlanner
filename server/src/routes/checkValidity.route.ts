import express from 'express';
import { checkValidityCtrl } from '../controllers';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.get('/', checkValidityCtrl);

export { router as checkValidityRouter };
