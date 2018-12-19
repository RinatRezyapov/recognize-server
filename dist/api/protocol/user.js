"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolCommand_1 = require("./ProtocolCommand");
class Create extends ProtocolCommand_1.default {
    constructor({ user }) {
        super('User', 'Create', { user });
    }
}
exports.Create = Create;
class Request extends ProtocolCommand_1.default {
    constructor({ userId }) {
        super('User', 'Request', { userId });
    }
}
exports.Request = Request;
class Update extends ProtocolCommand_1.default {
    constructor({ courseMe }) {
        super('User', 'Update', { courseMe });
    }
}
exports.Update = Update;
class Delete extends ProtocolCommand_1.default {
    constructor({ userId }) {
        super('User', 'Delete', { userId });
    }
}
exports.Delete = Delete;
exports.default = {
    serviceName: "User",
    Request,
    Update,
    Create,
    Delete,
};
//# sourceMappingURL=user.js.map