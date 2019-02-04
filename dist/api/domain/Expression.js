"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolObject_1 = require("./ProtocolObject");
const TypeId_1 = require("./TypeId");
class Expression extends ProtocolObject_1.default {
    constructor({ tpe }) {
        super({ tpe });
    }
}
exports.Expression = Expression;
class ExpressionEq extends Expression {
    constructor() {
        super({ tpe: ExpressionEq.$Type });
    }
}
ExpressionEq.$Type = new TypeId_1.default({ value: 'ExpressionEq' });
exports.ExpressionEq = ExpressionEq;
class ExpressionContains extends Expression {
    constructor() {
        super({ tpe: ExpressionContains.$Type });
    }
}
ExpressionContains.$Type = new TypeId_1.default({ value: 'ExpressionContains' });
exports.ExpressionContains = ExpressionContains;
//# sourceMappingURL=Expression.js.map