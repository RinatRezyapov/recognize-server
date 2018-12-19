import { mongooseConnect } from './config/configMongoose';
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

configWebSocket();