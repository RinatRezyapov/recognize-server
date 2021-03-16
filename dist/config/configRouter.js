"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configRouter = void 0;
const express = require("express");
const jwt = require("jsonwebtoken");
const files_1 = require("../commandHandlers/files");
const SECRET = 'server secret';
const TOKENTIME = 120 * 60;
const configRouter = (passport) => {
    const router = express.Router();
    router.post('/login', passport.authenticate('local-login', {
        session: false
    }), generateToken, respond);
    router.post('/signup', passport.authenticate('local-signup', {
        session: false
    }), generateToken, respond);
    router.get('/file/:id', files_1.handleFilesApi);
    return router;
};
exports.configRouter = configRouter;
const generateToken = (req, res, next) => {
    req.token = jwt.sign({ id: req.user.id }, SECRET, { expiresIn: TOKENTIME });
    next();
};
const respond = async (req, res) => {
    res.status(200).json({
        token: req.token
    });
};
//# sourceMappingURL=configRouter.js.map