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
exports.handleUserCommand = (msg, ws) => __awaiter(this, void 0, void 0, function* () {
    Option_1.fromNullable(user_1.default[msg.method]).map((Constructor) => __awaiter(this, void 0, void 0, function* () {
        const command = new Constructor(JSON_1.fromJSON(msg.data));
        if (command instanceof user_1.default.Create) {
        }
        else if (command instanceof user_1.default.Request) {
            Option_1.fromNullable(command.data.userId).map((userId) => __awaiter(this, void 0, void 0, function* () {
                const response = yield user_2.default.findById(userId.value);
                Option_1.fromNullable(response).map(response => configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: msg.id,
                    data: [1, new entities_1.ServerResponseObjectResolved({
                            data: constructUser(response)
                        })]
                })));
            }));
        }
        else if (command instanceof user_1.default.List) {
            const response = yield user_2.default.find();
            Option_1.fromNullable(response).map(response => configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: msg.id,
                data: [1, new entities_1.ServerResponseObjectsListResolved({
                        data: response.map(response => constructUser(response))
                    })]
            })));
        }
        else if (command instanceof user_1.default.Update) {
            Option_1.fromNullable(command.data.userMe).map((userMe) => __awaiter(this, void 0, void 0, function* () {
                const response = yield user_2.default.findByIdAndUpdate(userMe.id.value, { data: userMe.entity }, { new: true });
                Option_1.fromNullable(response).map(response => configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: msg.id,
                    data: [1, new entities_1.ServerResponseObjectResolved({
                            data: constructUser(response)
                        })]
                })));
            }));
        }
        else if (command instanceof user_1.default.Delete) {
        }
        else if (command instanceof user_1.default.ListById) {
            Option_1.fromNullable(command.data.userIds).map((userIds) => __awaiter(this, void 0, void 0, function* () {
                const response = yield user_2.default.find().where('_id').in(userIds.map(v => v.value));
                Option_1.fromNullable(response).map(response => configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: msg.id,
                    data: [1, new entities_1.ServerResponseObjectsListResolved({
                            data: response.map(response => constructUser(response))
                        })]
                })));
            }));
        }
    }));
});
const constructUser = (v) => {
    return new entities_1.ME({
        id: new entities_1.Id({ value: v._id }),
        entity: new entities_1.User({
            name: v.data.name,
            email: v.data.email,
            avatar: v.data.avatar,
            joinedDate: v.data.joinedDate,
            courses: v.data.courses,
            followers: v.data.followers,
            following: v.data.following,
        })
    });
};
exports.addCourseToUserCourses = (response) => {
    user_2.default.findById(response.data.owner.value, (err, user) => {
        if (err)
            return console.log(err);
        user.data.courses[user.data.courses.length] = new entities_1.Id({ value: response._id });
        user.markModified('data.courses');
        user.save();
    });
};
exports.removeCourseFromUserCourses = (response) => {
    user_2.default.findById(response.data.owner.value, (err, user) => {
        if (err)
            return console.log(err);
        const idx = user.data.courses.findIndex(el => el.value.toString() === response._id.toString());
        if (idx !== -1) {
            const newCourses = [...user.data.courses.slice(0, idx), ...user.data.courses.slice(idx + 1)];
            user.data.courses = newCourses;
            user.markModified('data.courses');
            user.save();
        }
    });
};
//# sourceMappingURL=user.js.map