import { mongooseConnect } from './config/configMongoose';
import { configPassport } from './config/configPassport';
import { configApp } from './config/configApp';
import { configRouter } from './config/configRouter';
import { configWebSocket } from './config/configWebSocket';
const port = process.env.PORT || 80;


import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
export const SECRET = 'server secret';
export const TOKENTIME = 120 * 60;

mongooseConnect();

const passport = configPassport();
const router = configRouter(passport);

const server = express()
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.use(cors())
.use(passport.initialize())
.use('/', router)
.listen(port, () => console.log(`Listening on ${ port }`))


configWebSocket(server);