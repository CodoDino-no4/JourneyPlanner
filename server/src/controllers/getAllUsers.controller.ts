import { Request, Response } from 'express';
import { NotFoundError } from '../errors';
import { User } from '../schemas';

export const getAllUsersCtrl = async (req: Request, res: Response) => {
  await User.find({})
    .then((users) => {
      if (users !== null) {
        res.json(users);
      } else {
        throw new NotFoundError();
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: 'User not found', err });
        console.log(err);
      }
    });
};
