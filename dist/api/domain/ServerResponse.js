"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolObject_1 = require("./ProtocolObject");
const TypeId_1 = require("./TypeId");
class ServerResponse extends ProtocolObject_1.default {
    constructor({ msgId, data }) {
        super({ tpe: ServerResponse.$Type });
        this.msgId = msgId;
        this.data = data;
    }
}
ServerResponse.$Type = new TypeId_1.default({ value: 'ServerMessage.ServerResponse' });
exports.ServerResponse = ServerResponse;
class ServerResponseObjectResolved extends ProtocolObject_1.default {
    constructor({ data }) {
        super({ tpe: ServerResponseObjectResolved.$Type });
        this.data = data;
    }
}
ServerResponseObjectResolved.$Type = new TypeId_1.default({ value: 'ServerResponse.ObjectResolved' });
exports.ServerResponseObjectResolved = ServerResponseObjectResolved;
class ServerResponseObjectsListResolved extends ProtocolObject_1.default {
    constructor({ data }) {
        super({ tpe: ServerResponseObjectsListResolved.$Type });
        this.data = data;
    }
}
ServerResponseObjectsListResolved.$Type = new TypeId_1.default({ value: 'ServerResponse.ObjectsListResolved' });
exports.ServerResponseObjectsListResolved = ServerResponseObjectsListResolved;
//# sourceMappingURL=ServerResponse.js.map