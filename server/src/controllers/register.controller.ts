import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../schemas/userSchema';

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
        res.status(400).json({ error: 'Error registering user', err });
        console.log(err.message);
      }
    });

    res.status(200).json('Successfully registered User');
  });
};
