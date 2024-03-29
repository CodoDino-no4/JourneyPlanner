import * as dotenv from 'dotenv';
dotenv.config();
import mongoose, { connection } from 'mongoose';
import { errorHandler, log } from './middlewares';
import { app } from './server';

const port: string | number = process.env.PORT || 3001;
const uri: string = process.env.DB_URI || '';

const conn = async () => {
  await mongoose.connect(uri);
};

conn()
  .catch(() => {
    errorHandler('Connection error: not connected to MongoDB', 502, 'init');
    process.exit(1);
  })
  .then(() => {
    app.listen(port, () => {
      log.info(`Mongo Server listening on port ${port}`);
    });
  });

export { connection as db };
