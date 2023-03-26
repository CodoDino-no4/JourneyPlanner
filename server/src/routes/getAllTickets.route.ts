import express from 'express';
import { getAllTicketsCtrl } from '../controllers';
import { validateRequest } from '../middlewares';
import { keycloak } from '../middlewares/keycloak';

const router = express.Router();

router.get('/', validateRequest, keycloak.protect('Admin'), getAllTicketsCtrl);

export { router as getAllTicketsRouter };
