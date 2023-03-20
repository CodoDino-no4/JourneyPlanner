import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../schemas/userSchema';
import { errorHandler, log } from '../middlewares';

export const registerCtrl = async (req: Request, res: Response) => {
  const saltRounds = 10;
  const { first_name, second_name, email, password, user_type } = req.body;
  await bcrypt.hash(password, saltRounds).then(async (hash) => {
    await User.create({
      first_name: first_name,
      second_name: second_name,
      email: email,
      password: hash,
      created_on: Date.now(),
      user_type: user_type,
    }).catch((err) => {
      if (err) {
        res.status(400).json(errorHandler('Error registering user', 400, res));
      }
    });

    res.status(200).json('Successfully registered User');
    log.info(req.baseUrl, 200);
  });
};
