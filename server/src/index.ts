import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import app from './server';
import { UsersDAO } from './dao';

const port: string | number = process.env.PORT || 8000;
const uri: string = process.env.DB_URI || '';

MongoClient.connect(uri)
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await UsersDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Mongo Server listening on port ${port}`);
    });
  });
