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

const app = express();

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

// Ticket routes
app.use('/api/tickets', getAllTicketsRouter);
app.use('/api/user/tickets', getUserTicketsRouter);
app.use('/api/check-validity', checkValidityRouter);

// 404 handler
app.all('*', async () => {
  throw new NotFoundError();
});

// Generic error handler
app.use(errorHandler);

export { app };
