"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolObject_1 = require("./ProtocolObject");
const TypeId_1 = require("./TypeId");
class SearchQuery extends ProtocolObject_1.default {
    constructor({ entity, field, expression, value, }) {
        super({ tpe: SearchQuery.$Type });
        this.entity = entity;
        this.field = field;
        this.expression = expression;
        this.value = value;
    }
}
SearchQuery.$Type = new TypeId_1.default({ value: 'SearchQuery' });
exports.default = SearchQuery;
//# sourceMappingURL=SearchQuery.js.map