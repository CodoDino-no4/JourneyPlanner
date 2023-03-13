import express from 'express';
import { getAllUsersCtrl } from '../controllers';
import { validateRequest } from '../middlewares';

const router = express.Router();

// Call the controller
// '/' api url is not set here
router.get('/', validateRequest, getAllUsersCtrl);

export { router as getAllUsersRouter };
