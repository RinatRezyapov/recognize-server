import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { mongooseConnect } from './config/configMongoose';
import { configPassport } from './config/configPassport';
import { configRouter } from './config/configRouter';
import { configWebSocket } from './config/configWebSocket';

const PORT = process.env.PORT || 80;

mongooseConnect();

const passport = configPassport();
const router = configRouter(passport);

const server = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cors())
    .use(passport.initialize())
    .use('/', router)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))


configWebSocket(server);