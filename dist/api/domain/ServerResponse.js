"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerResponseObjectsListResolved = exports.ServerResponseObjectResolved = exports.ServerResponse = void 0;
const ProtocolObject_1 = require("./ProtocolObject");
const TypeId_1 = require("./TypeId");
class ServerResponse extends ProtocolObject_1.default {
    constructor({ msgId, data }) {
        super({ tpe: ServerResponse.$Type });
        this.msgId = msgId;
        this.data = data;
    }
}
exports.ServerResponse = ServerResponse;
ServerResponse.$Type = new TypeId_1.default({ value: 'ServerMessage.ServerResponse' });
class ServerResponseObjectResolved extends ProtocolObject_1.default {
    constructor({ data }) {
        super({ tpe: ServerResponseObjectResolved.$Type });
        this.data = data;
    }
}
exports.ServerResponseObjectResolved = ServerResponseObjectResolved;
ServerResponseObjectResolved.$Type = new TypeId_1.default({ value: 'ServerResponse.ObjectResolved' });
class ServerResponseObjectsListResolved extends ProtocolObject_1.default {
    constructor({ data }) {
        super({ tpe: ServerResponseObjectsListResolved.$Type });
        this.data = data;
    }
}
exports.ServerResponseObjectsListResolved = ServerResponseObjectsListResolved;
ServerResponseObjectsListResolved.$Type = new TypeId_1.default({ value: 'ServerResponse.ObjectsListResolved' });
//# sourceMappingURL=ServerResponse.js.map