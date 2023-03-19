import { Request, Response } from 'express';
import { NotFoundError } from '../errors';
import { User } from '../schemas/userSchema';

export const getUserCtrl = async (req: Request, res: Response) => {
  const { _id } = req.params;

  await User.findById({ _id })
    .then((user) => {
      if (user !== null) {
        res.json(user);
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
