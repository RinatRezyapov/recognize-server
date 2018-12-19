"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../api/protocol/user");
const Option_1 = require("fp-ts/lib/Option");
const JSON_1 = require("../api/protocol/JSON");
const entities_1 = require("../api/entities");
const user_2 = require("../models/user");
const configWebSocket_1 = require("../config/configWebSocket");
exports.handleUserCommand = (parsedMsg, ws) => __awaiter(this, void 0, void 0, function* () {
    Option_1.fromNullable(user_1.default[parsedMsg.method]).map((Constructor) => __awaiter(this, void 0, void 0, function* () {
        const command = new Constructor(JSON_1.fromJSON(parsedMsg.data));
        if (command instanceof user_1.default.Create) {
        }
        else if (command instanceof user_1.default.Request) {
            Option_1.fromNullable(command.data.userId).map((userId) => __awaiter(this, void 0, void 0, function* () {
                const userDbResponse = yield user_2.default.findById(userId.value);
                Option_1.fromNullable(userDbResponse).map(v => configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: parsedMsg.id,
                    data: [1, new entities_1.ServerResponseObjectResolved({
                            data: new entities_1.ME({
                                id: new entities_1.Id({ value: v._id }),
                                entity: new entities_1.User({ name: v.data.name, email: v.data.email, avatar: v.data.avatar })
                            })
                        })]
                })));
            }));
        }
        else if (command instanceof user_1.default.Update) {
        }
        else if (command instanceof user_1.default.Delete) {
        }
    }));
});
//# sourceMappingURL=user.js.map