import express from 'express';
import { body } from 'express-validator';
import Keycloak from 'keycloak-connect';
import { addTicketCtrl } from '../controllers';
import { validateRequest } from '../middlewares';
import session from 'express-session';

const router = express.Router();
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

// Call the controller
// '/' api url is not set here
router.post(
  '/',
  [
    body('ticket_type')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Must be a valid ticket type'),
    body('user_email')
      .isEmail()
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage('Must be a valid email registered on the system'),
  ],
  validateRequest,
  keycloak.protect('Admin'),
  addTicketCtrl
);

export { router as addTicketRouter };

// {
//     "ticket_type": "Day",
//     "user_email": "customer@journeyplanner.com"
// }
