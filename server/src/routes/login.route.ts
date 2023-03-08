import express from 'express';
import { loginCtrl } from '../controllers';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.post('/', loginCtrl);

export { router as loginRouter };
