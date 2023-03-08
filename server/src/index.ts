import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './server';

const port: string | number = process.env.PORT || 8000;
const uri: string = process.env.DB_URI || '';

async function main() {
  await mongoose.connect(uri);
}

main()
  .catch((err) => {
    console.log('error', err.stack);
    process.exit(1);
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Mongo Server listening on port ${port}`);
    });
  });
