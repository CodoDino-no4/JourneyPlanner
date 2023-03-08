import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../schemas/userSchema';

export const registerCtrl = async (req: Request, res: Response) => {
  const saltRounds = 10;
  const { fName, sName, email, password } = req.body;

  //console.log(req);
  console.log(fName, sName, email, password);

  await bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      User.create({
        first_name: fName,
        second_name: sName,
        email: email,
        password: hash,
        created_on: Date.now(),
      });
    })
    .then(() => {
      res.status(200).json('Successfuly created user');
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: 'wah wah waaaaaahhh' });
        console.log(err);
      }
    });
};
