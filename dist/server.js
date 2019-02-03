"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const configMongoose_1 = require("./config/configMongoose");
const configPassport_1 = require("./config/configPassport");
const configRouter_1 = require("./config/configRouter");
const configWebSocket_1 = require("./config/configWebSocket");
const PORT = process.env.PORT || 80;
configMongoose_1.mongooseConnect();
const passport = configPassport_1.configPassport();
const router = configRouter_1.configRouter(passport);
const server = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cors())
    .use(passport.initialize())
    .use('/', router)
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
configWebSocket_1.configWebSocket(server);
//# sourceMappingURL=server.js.map