"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt = require("jsonwebtoken");
const files_1 = require("../commandHandlers/files");
const SECRET = 'server secret';
const TOKENTIME = 120 * 60;
exports.configRouter = (passport) => {
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
const generateToken = (req, res, next) => {
    req.token = jwt.sign({ id: req.user.id }, SECRET, { expiresIn: TOKENTIME });
    next();
};
const respond = (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.status(200).json({
        token: req.token
    });
});
//# sourceMappingURL=configRouter.js.map