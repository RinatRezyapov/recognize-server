"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConnect = void 0;
const mongoose = require("mongoose");
const dbConfig = {
    'url': `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/recognize?retryWrites=true&w=majority`,
};
const mongooseConnect = () => {
    mongoose.connection.openUri(dbConfig.url, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(r => console.log('Connected to database', process.env.DB_HOST))
        .catch(e => console.log('Database connection error', e));
};
exports.mongooseConnect = mongooseConnect;
//# sourceMappingURL=configMongoose.js.map