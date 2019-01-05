import { mongooseConnect } from './config/configMongoose';
import { configPassport } from './config/configPassport';
import { configApp } from './config/configApp';
import { configRouter } from './config/configRouter';
import { configWebSocket } from './config/configWebSocket';
const port = process.env.PORT || 80;
const express = require('express');

mongooseConnect();

const server = configApp();
const passport = configPassport();
const router = configRouter(passport);

server.use(passport.initialize());
server.use('/', router);
server.listen(port);

server.listen(port, () => console.log(`Listening on ${ port }`));

configWebSocket(server);