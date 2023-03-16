import mongoose from 'mongoose';
import { userTypeEnum } from '../utils/userTypeEnum';

interface IUser {
  first_name: string;
  second_name: string;
  email: string;
  password: string;
  created_on: Date;
  user_type: userTypeEnum;
}

const userSchema = new mongoose.Schema<IUser>({
  first_name: { type: String, required: true },
  second_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_on: { type: Date, required: true },
  user_type: { type: String, enum: userTypeEnum, required: true },
});

userSchema.methods.getFirstName = function getFirstName() {
  return this.first_name;
};

userSchema.methods.getType = function getType() {
  return this.user_type;
};

export const User = mongoose.model<IUser>('User', userSchema, 'users'); // model created from schema

// {
//     "first_name": "test",
//     "second_name": "Acc",
//     "email": "test@journeyPlanner.com",
//     "password": "ThisisTestPassword123!",
//     "user_type": "ADMIN"
// }
