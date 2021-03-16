"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionContains = exports.ExpressionEq = exports.Expression = void 0;
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
exports.ExpressionEq = ExpressionEq;
ExpressionEq.$Type = new TypeId_1.default({ value: 'ExpressionEq' });
class ExpressionContains extends Expression {
    constructor() {
        super({ tpe: ExpressionContains.$Type });
    }
}
exports.ExpressionContains = ExpressionContains;
ExpressionContains.$Type = new TypeId_1.default({ value: 'ExpressionContains' });
//# sourceMappingURL=Expression.js.map