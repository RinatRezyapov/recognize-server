"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListIds = exports.ListAll = exports.Request = exports.Delete = exports.Update = exports.List = exports.Create = void 0;
const ProtocolCommand_1 = require("./ProtocolCommand");
class Create extends ProtocolCommand_1.default {
    constructor({ course }) {
        super('Courses', 'Create', { course });
    }
}
exports.Create = Create;
class List extends ProtocolCommand_1.default {
    constructor({ userId }) {
        super('Courses', 'List', { userId });
    }
}
exports.List = List;
class Update extends ProtocolCommand_1.default {
    constructor({ courseMe }) {
        super('Courses', 'Update', { courseMe });
    }
}
exports.Update = Update;
class Delete extends ProtocolCommand_1.default {
    constructor({ courseId }) {
        super('Courses', 'Delete', { courseId });
    }
}
exports.Delete = Delete;
class Request extends ProtocolCommand_1.default {
    constructor({ courseId }) {
        super('Courses', 'Request', { courseId });
    }
}
exports.Request = Request;
class ListAll extends ProtocolCommand_1.default {
    constructor() {
        super('Courses', 'ListAll', {});
    }
}
exports.ListAll = ListAll;
class ListIds extends ProtocolCommand_1.default {
    constructor({ courseIds }) {
        super('Courses', 'ListIds', { courseIds });
    }
}
exports.ListIds = ListIds;
exports.default = {
    serviceName: "Courses",
    List,
    Update,
    Create,
    Delete,
    Request,
    ListAll,
    ListIds,
};
//# sourceMappingURL=courses.js.map