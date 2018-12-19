"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolCommand_1 = require("./ProtocolCommand");
class Create extends ProtocolCommand_1.default {
    constructor({ course }) {
        super('EventLines', 'Create', { course });
    }
}
exports.Create = Create;
class List extends ProtocolCommand_1.default {
    constructor({ userId }) {
        super('EventLines', 'List', { userId });
    }
}
exports.List = List;
class Update extends ProtocolCommand_1.default {
    constructor({ courseMe }) {
        super('EventLines', 'Update', { courseMe });
    }
}
exports.Update = Update;
class Delete extends ProtocolCommand_1.default {
    constructor({ courseId }) {
        super('EventLines', 'Delete', { courseId });
    }
}
exports.Delete = Delete;
exports.default = {
    serviceName: "Courses",
    List,
    Update,
    Create,
    Delete,
};
//# sourceMappingURL=courses.js.map