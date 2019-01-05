/*import { mongooseConnect } from './config/configMongoose';
import { configPassport } from './config/configPassport';
import { configApp } from './config/configApp';
import { configRouter } from './config/configRouter';
import { configWebSocket } from './config/configWebSocket';
const port = process.env.PORT || 80;

mongooseConnect();

const app = configApp();
const passport = configPassport();
const router = configRouter(passport);

app.use(passport.initialize());
app.use('/', router);
app.listen(port);

configWebSocket(app);*/

'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);