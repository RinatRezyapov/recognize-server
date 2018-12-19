"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const configDB = require('./config/database.js');
const app_1 = require("./app");
const port = process.env.PORT || 3001;
//require('./config/passport')(passport);
mongoose.connect(configDB.url);
//passport.initialize();
//app.use(passport.initialize());
//require('./routes.js')(app, passport, jwt); // load our routes and pass in our app and fully configured passport
app_1.default.listen(port);
/*const webSocket = require('ws');
 
const wss = new webSocket.Server({ port: 3000 });
 
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const object = JSON.parse(message);
    console.log(jwt.verify(JSON.parse(object.data).token, 'server secret'))
  });
 
  ws.send('something');
});
*/ 
//# sourceMappingURL=server.js.map