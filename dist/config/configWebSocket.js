"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws = require("ws");
const courses_1 = require("../api/protocol/courses");
const user_1 = require("../api/protocol/user");
const courses_2 = require("../commandHandlers/courses");
const user_2 = require("../commandHandlers/user");
const Option_1 = require("fp-ts/lib/Option");
exports.configWebSocket = (server) => {
    const wss = new ws.Server({ server });
    wss.on('connection', (ws) => {
        ws.on('message', (msg) => {
            const parsedMsg = JSON.parse(msg);
            Option_1.fromNullable(parsedMsg.service).map((commandService) => {
                switch (commandService) {
                    case courses_1.default.serviceName:
                        courses_2.handleCourseCommand(parsedMsg, ws);
                        break;
                    case user_1.default.serviceName:
                        user_2.handleUserCommand(parsedMsg, ws);
                        break;
                }
            });
        });
        ws.on('close', (code, reason) => {
        });
        ws.on('error', (err) => {
        });
        ws.on('upgrade', (request) => {
        });
        ws.on('open', () => {
        });
        ws.on('ping', (data) => {
        });
        ws.on('pong', (data) => {
        });
        ws.on('unexpected-response', (request, response) => {
        });
    });
};
exports.wsSend = (ws, response) => {
    ws.send(JSON.stringify(response));
};
//# sourceMappingURL=configWebSocket.js.map