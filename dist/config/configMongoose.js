"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dbConfig = {
    'url': 'mongodb://test777:test777@ds125293.mlab.com:25293/recognize',
};
exports.mongooseConnect = () => {
    mongoose.connection.openUri(dbConfig.url)
        .once('open', () => console.log('Connected to database: ' + dbConfig.url))
        .on('error', (error) => console.warn('Database connection error', error));
};
//# sourceMappingURL=configMongoose.js.map