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
const files_1 = require("../api/protocol/files");
const Option_1 = require("fp-ts/lib/Option");
const JSON_1 = require("../api/protocol/JSON");
const entities_1 = require("../api/entities");
const configWebSocket_1 = require("../config/configWebSocket");
const files_2 = require("../models/files");
exports.handleFilesCommand = (parsedMsg, ws) => __awaiter(this, void 0, void 0, function* () {
    Option_1.fromNullable(files_1.default[parsedMsg.method]).map((Constructor) => __awaiter(this, void 0, void 0, function* () {
        const command = new Constructor(JSON_1.fromJSON(parsedMsg.data));
        if (command instanceof files_1.default.Send) {
            const response = yield files_2.default.create({ data: parsedMsg.data.file, contentType: 'image/png' });
            Option_1.fromNullable(response).map(v => configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: parsedMsg.id,
                data: [1, new entities_1.ServerResponseObjectResolved({
                        data: new entities_1.Id({ value: response.id })
                    })]
            })));
        }
    }));
});
exports.handleFilesApi = (req, res) => {
    files_2.default.findById(req.params.id).then(response => {
        var data = response.data.split(",")[1];
        var dataBuffer = new Buffer(data, 'base64');
        res.writeHead(200, {
            'Content-Type': response.contentType,
            'Content-Length': dataBuffer.length
        });
        res.end(dataBuffer);
    });
};
//# sourceMappingURL=files.js.map