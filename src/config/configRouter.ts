import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import FilesModel from '../models/files';
import { handleFilesApi } from '../commandHandlers/files';
const SECRET = 'server secret';
const TOKENTIME = 120 * 60;

export const configRouter = (passport: any) => {
  const router = express.Router();

  router.post('/login', passport.authenticate('local-login', {
    session: false
  }), generateToken, respond);

  router.post('/signup', passport.authenticate('local-signup', {
    session: false
  }), generateToken, respond);

  router.get('/file/:id', handleFilesApi);

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