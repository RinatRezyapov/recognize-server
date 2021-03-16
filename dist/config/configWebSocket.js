"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsSend = exports.configWebSocket = void 0;
const ws = require("ws");
const courses_1 = require("../api/protocol/courses");
const user_1 = require("../api/protocol/user");
const files_1 = require("../api/protocol/files");
const search_1 = require("../api/protocol/search");
const courses_2 = require("../commandHandlers/courses");
const user_2 = require("../commandHandlers/user");
const files_2 = require("../commandHandlers/files");
const search_2 = require("../commandHandlers/search");
const Option_1 = require("fp-ts/lib/Option");
const configWebSocket = (server) => {
    const wss = new ws.Server({ server });
    wss.on('connection', (ws) => {
        ws.on('message', (msg) => {
            if (typeof msg === 'string') {
                console.log('----Request----: ' + msg);
                const parsedMsg = JSON.parse(msg);
                Option_1.fromNullable(parsedMsg.service).map((commandService) => {
                    switch (commandService) {
                        case courses_1.default.serviceName:
                            courses_2.handleCourseCommand(parsedMsg, ws);
                            break;
                        case user_1.default.serviceName:
                            user_2.handleUserCommand(parsedMsg, ws);
                            break;
                        case files_1.default.serviceName:
                            files_2.handleFilesCommand(parsedMsg, ws);
                            break;
                        case search_1.default.serviceName:
                            search_2.handleSearchCommand(parsedMsg, ws);
                            break;
                    }
                });
            }
            else {
                console.log('Error parsing message', msg);
            }
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
exports.configWebSocket = configWebSocket;
const wsSend = (ws, response) => {
    const stringifiedResponse = JSON.stringify(response);
    console.log('----Response----: ' + stringifiedResponse);
    ws.send(stringifiedResponse);
};
exports.wsSend = wsSend;
//# sourceMappingURL=configWebSocket.js.map