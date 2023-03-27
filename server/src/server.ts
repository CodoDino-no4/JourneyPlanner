import express, { Response, Request } from 'express';
import cors from 'cors';
import {
  getAllUsersRouter,
  getUserRouter,
  checkValidityRouter,
  registerRouter,
  getAllTicketsRouter,
  getUserTicketsRouter,
  addTicketRouter,
  updateTicketRouter,
} from './routes';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { log } from './middlewares';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Content-Type', ['application/json']);
  res.setHeader('Accept', ['application/json']);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

// Sets headers
app.use(helmet());

// Cors rules
app.use(cors());

// server can accept json in the body of a request
app.use(express.json());

// Auth routes
app.use('/api/auth/register', registerRouter);

// User routes
app.use('/api/user', getUserRouter);
app.use('/api/users', getAllUsersRouter);
app.use('/api/user/tickets', getUserTicketsRouter);

// Ticket routes
app.use('/api/add-ticket', addTicketRouter);
app.use('/api/tickets', getAllTicketsRouter);
app.use('/api/check-ticket', checkValidityRouter);
app.use('/api/update-ticket', updateTicketRouter);

// 404 handler
app.all('*', (req: Request, res: Response) => {
  throw (
    res.status(404).json({ error: 404, message: 'Route not found' }) &&
    log.error('Route not found', 404, req.baseUrl)
  );
});

export { app };
