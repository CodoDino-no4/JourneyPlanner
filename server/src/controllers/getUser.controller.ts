import { Request, Response } from 'express';
import { BadRequestError, CustomError } from '../errors';
import { errorHandler } from '../middlewares';
import { User } from '../schemas/userSchema';

export const getUserCtrl = async (req: Request, res: Response) => {
  const { user_email } = req.body;

  await User.findOne({ email: user_email })
    .then((user) => {
      if (user !== null) {
        res.json(user);
      } else {
        throw errorHandler;
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: 'User not found', err });
        console.log(err);
      }
    });
};

// const user_id = await User.findOne({email: user_email}, '_id')
//   .then((user) => {
//     if (user != null)
//     {
//       const id = user?._id.toHexString();
//       console.log(id);
//       return id;
//     }
//   })
//   .catch((err) => {
//     if (err) {
//       res.status(400).json({ error: 'User ID not found', err });
//       console.log(err);
//     }
//   });
