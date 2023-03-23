import { Request, Response } from 'express';
import { errorHandler, log } from '../middlewares';
import { User } from '../schemas/userSchema';

export const getUserCtrl = async (req: Request, res: Response) => {
  const { _id } = req.params;

  await User.findById({ _id })
    .then((user) => {
      if (user !== null) {
        res.json(user);
        log.info(req.baseUrl, 200);
      } else {
        throw errorHandler('User not found', 400, req.baseUrl);
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).json(errorHandler('User not found', 400, req.baseUrl));
      }
    });
};
