"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configMongoose_1 = require("./config/configMongoose");
const configWebSocket_1 = require("./config/configWebSocket");
const port = process.env.PORT || 80;
const express = require('express');
configMongoose_1.mongooseConnect();
/*const app = configApp();
const passport = configPassport();
const router = configRouter(passport);

app.use(passport.initialize());
app.use('/', router);
app.listen(port);*/
const server = express()
    .listen(port, () => console.log(`Listening on ${port}`));
configWebSocket_1.configWebSocket(server);
//# sourceMappingURL=server.js.map