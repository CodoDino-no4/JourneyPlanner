import { Request, Response } from 'express';
import { User } from '../schemas';
import { log } from '../middlewares';
import { errorHandler } from '../middlewares';

export const getAllUsersCtrl = async (req: Request, res: Response) => {
  await User.find({})
    .then((users) => {
      if (users !== null) {
        res.status(200).json(users);
        log.info(req.baseUrl, 200);
      } else {
        throw errorHandler('No users found', 400, res);
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).json(errorHandler('No users found', 400, res));
      }
    });
};
