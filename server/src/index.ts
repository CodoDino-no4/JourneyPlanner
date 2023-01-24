import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './server';

const port: string | number = process.env.PORT || 8000;
const uri: string = process.env.DB_URI || '';

mongoose.set('strictQuery', false);
mongoose
  .connect(uri)
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((error) => {
    throw error;
  });
