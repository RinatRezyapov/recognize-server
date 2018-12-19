"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolObject_1 = require("./ProtocolObject");
const TypeId_1 = require("./TypeId");
class ME extends ProtocolObject_1.default {
    constructor({ id, entity }) {
        super({ tpe: ME.$Type });
        this.id = id;
        this.entity = entity;
    }
}
ME.$Type = new TypeId_1.default({ value: 'ME' });
exports.default = ME;
//# sourceMappingURL=ME.js.map