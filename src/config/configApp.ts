import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
export const SECRET = 'server secret';
export const TOKENTIME = 120 * 60;

export const configApp = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  return app;
}