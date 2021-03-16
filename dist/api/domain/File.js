"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolObject_1 = require("./ProtocolObject");
const TypeId_1 = require("./TypeId");
class File extends ProtocolObject_1.default {
    constructor({ name, }) {
        super({ tpe: File.$Type });
        this.name = name;
    }
}
exports.default = File;
File.$Type = new TypeId_1.default({ value: 'File' });
//# sourceMappingURL=File.js.map