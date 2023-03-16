import express from 'express';
import cors from 'cors';
import {
  getAllUsersRouter,
  getUserRouter,
  loginRouter,
  checkValidityRouter,
  registerRouter,
  getAllTicketsRouter,
  getUserTicketsRouter,
} from './routes';
import { errorHandler } from './middlewares';
import { NotFoundError } from './errors';
import helmet from 'helmet';
import { addTicketRouter } from './routes/addTicket.route';
import bodyParser from 'body-parser';
import { updateTicketRouter } from './routes/updateTicket.route';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Sets headers
app.use(helmet());

// Cors rules
app.use(cors());

// server can accept json in the body of a request
app.use(express.json());

// Auth routes
app.use('/api/auth/login', loginRouter);
app.use('/api/auth/register', registerRouter);

// User routes
app.use('/api/users', getAllUsersRouter);
app.use('/api/user', getUserRouter);
app.use('/api/user/tickets', getUserTicketsRouter);

// Ticket routes
app.use('/api/tickets', getAllTicketsRouter);
app.use('/api/add-ticket', addTicketRouter);
app.use('/api/check-validity', checkValidityRouter);
app.use('/api/update-ticket', updateTicketRouter);

// 404 handler
app.all('*', async () => {
  throw new NotFoundError();
});

// Generic error handler
app.use(errorHandler);

export { app };
