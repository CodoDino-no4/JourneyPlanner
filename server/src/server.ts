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
// import session from 'express-session';
// import Keycloak from 'keycloak-connect';
// import config from './keycloak.json';

const app = express();

// const memoryStore = new session.MemoryStore();
// const keycloak = new Keycloak({ store: memoryStore }, config);

// //session
// app.use(session({
//   secret: process.env.SESSSECRET || '',
//   resave: false,
//   saveUninitialized: true,
//   store: memoryStore
// }));

//app.use(keycloak.middleware());

// app.use(
//   '/',
//   createProxyMiddleware({
//     target: 'http://127.0.0.1:3001/api',
//     changeOrigin: true,
//   })
// );

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

//app.use( keycloak.middleware( { logout: '/'} ));

export { app };
