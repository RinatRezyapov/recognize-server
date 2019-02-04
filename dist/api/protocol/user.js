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
class List extends ProtocolCommand_1.default {
    constructor() {
        super('User', 'List');
    }
}
exports.List = List;
class ListById extends ProtocolCommand_1.default {
    constructor({ userIds }) {
        super('User', 'ListById', { userIds });
    }
}
exports.ListById = ListById;
class Update extends ProtocolCommand_1.default {
    constructor({ userMe }) {
        super('User', 'Update', { userMe });
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
    List,
    Update,
    Create,
    Delete,
    ListById,
};
//# sourceMappingURL=user.js.map