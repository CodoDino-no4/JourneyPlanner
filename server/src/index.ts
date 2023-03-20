import * as dotenv from 'dotenv';
dotenv.config();
import mongoose, { connection } from 'mongoose';
import { app } from './server';

const port: string | number = process.env.PORT || 3001;
const uri: string = process.env.DB_URI || '';

const conn = async () => {
  await mongoose.connect(uri);
};

conn()
  .catch((err) => {
    console.log('error', err.stack);
    process.exit(1);
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Mongo Server listening on port ${port}`);
    });
  });

export { connection as db };
