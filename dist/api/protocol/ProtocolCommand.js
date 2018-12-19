"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
class ProtocolCommand {
    constructor(service, method, data) {
        this.id = uuid.v4();
        this.service = service;
        this.method = method;
        this.data = data || {};
    }
}
exports.default = ProtocolCommand;
//# sourceMappingURL=ProtocolCommand.js.map