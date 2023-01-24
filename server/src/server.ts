import express from 'express';
import cors from 'cors';
import { getAllUsers } from './routes';

const app = express();

app.use(cors());

// server can accept json in the body of a request
app.use(express.json());

app.use('/api/v1/users', getAllUsers);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
