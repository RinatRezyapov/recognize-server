"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFilesApi = exports.handleFilesCommand = void 0;
const files_1 = require("../api/protocol/files");
const Option_1 = require("fp-ts/lib/Option");
const JSON_1 = require("../api/protocol/JSON");
const entities_1 = require("../api/entities");
const configWebSocket_1 = require("../config/configWebSocket");
const files_2 = require("../models/files");
const handleFilesCommand = async (parsedMsg, ws) => {
    Option_1.fromNullable(files_1.default[parsedMsg.method]).map(async (Constructor) => {
        const command = new Constructor(JSON_1.fromJSON(parsedMsg.data));
        if (command instanceof files_1.default.Send) {
            const response = await files_2.default.create({ data: parsedMsg.data.file, contentType: 'image/png' });
            Option_1.fromNullable(response).map(v => configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: parsedMsg.id,
                data: [1, new entities_1.ServerResponseObjectResolved({
                        data: new entities_1.Id({ value: response.id })
                    })]
            })));
        }
    });
};
exports.handleFilesCommand = handleFilesCommand;
const handleFilesApi = (req, res) => {
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
exports.handleFilesApi = handleFilesApi;
//# sourceMappingURL=files.js.map