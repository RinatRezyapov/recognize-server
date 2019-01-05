"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configMongoose_1 = require("./config/configMongoose");
const configPassport_1 = require("./config/configPassport");
const configApp_1 = require("./config/configApp");
const configRouter_1 = require("./config/configRouter");
const configWebSocket_1 = require("./config/configWebSocket");
const port = process.env.PORT || 80;
const express = require('express');
configMongoose_1.mongooseConnect();
const server = configApp_1.configApp();
const passport = configPassport_1.configPassport();
const router = configRouter_1.configRouter(passport);
server.use(passport.initialize());
server.use('/', router);
server.listen(port);
server.listen(port, () => console.log(`Listening on ${port}`));
configWebSocket_1.configWebSocket(server);
//# sourceMappingURL=server.js.map