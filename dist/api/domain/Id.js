"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolObject_1 = require("./ProtocolObject");
const TypeId_1 = require("./TypeId");
class Id extends ProtocolObject_1.default {
    constructor({ value }) {
        super({ tpe: Id.$Type });
        this.value = value;
    }
}
Id.$Type = new TypeId_1.default({ value: 'Id' });
exports.default = Id;
//# sourceMappingURL=Id.js.map