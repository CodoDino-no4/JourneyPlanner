import { Request, Response } from 'express';
import { Query, QuerySelector } from 'mongoose';
import { User } from '../schemas/userSchema';

export const getUserCtrl = async (req: Request, res: Response) => {
  await User.find({}, (err: string, users: any) => {
    res.json(users);
  }).catch((err) => {
    if (err) {
      res.status(400).json({ error: 'wah wah waaaaaahhh' });
      console.log(err);
    }
  });
};
