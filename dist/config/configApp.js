"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
exports.SECRET = 'server secret';
exports.TOKENTIME = 120 * 60;
exports.configApp = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    return app;
};
//# sourceMappingURL=configApp.js.map