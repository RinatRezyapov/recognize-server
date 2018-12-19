"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configMongoose_1 = require("./config/configMongoose");
const configPassport_1 = require("./config/configPassport");
const configApp_1 = require("./config/configApp");
const configRouter_1 = require("./config/configRouter");
const configWebSocket_1 = require("./config/configWebSocket");
const port = process.env.PORT || 3001;
configMongoose_1.mongooseConnect();
const app = configApp_1.configApp();
const passport = configPassport_1.configPassport();
const router = configRouter_1.configRouter(passport);
app.use(passport.initialize());
app.use('/', router);
app.listen(port);
configWebSocket_1.configWebSocket();
//# sourceMappingURL=server.js.map