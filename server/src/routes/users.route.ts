import express from 'express';
import { UsersCtrl } from '../controllers';

const router = express.Router();

router.route('/').get(UsersCtrl.apiGetUsers);

export { router as getAllUsers };
