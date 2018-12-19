import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import { User } from '../api/entities';
import { fromNullable } from 'fp-ts/lib/Option';
export const SECRET = 'server secret';
export const TOKENTIME = 120 * 60;

export const configRouter = (passport: any) => {
  const router = express.Router();

  router.post('/login', passport.authenticate('local-login', {
    session: false
  }), generateToken, respond);

  router.post('/signup', passport.authenticate('local-signup', {
    session: false
  }), generateToken, respond);

  return router;
}

const generateToken = (req: any, res: any, next: any) => {
  req.token = jwt.sign(
    { id: req.user.id },
    SECRET,
    { expiresIn: TOKENTIME }
  );
  next();
}

const respond = async (req: any, res: any) => {
  res.status(200).json({
    token: req.token
  })
}