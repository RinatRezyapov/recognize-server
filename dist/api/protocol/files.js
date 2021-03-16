"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Send = void 0;
const ProtocolCommand_1 = require("./ProtocolCommand");
class Send extends ProtocolCommand_1.default {
    constructor(file) {
        super('Files', 'Send', { file });
    }
}
exports.Send = Send;
exports.default = {
    serviceName: "Files",
    Send,
};
//# sourceMappingURL=files.js.map