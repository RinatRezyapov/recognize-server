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
const courses_1 = require("../api/protocol/courses");
const Option_1 = require("fp-ts/lib/Option");
const JSON_1 = require("../api/protocol/JSON");
const entities_1 = require("../api/entities");
const course_1 = require("../models/course");
const configWebSocket_1 = require("../config/configWebSocket");
const user_1 = require("./user");
const constructCourse = (v) => {
    return new entities_1.ME({
        id: new entities_1.Id({ value: v._id }),
        entity: new entities_1.Course({
            name: v.data.name,
            data: v.data.data,
            owner: v.data.owner,
            picture: v.data.picture,
            description: v.data.description,
            shortDescription: v.data.shortDescription,
            tags: v.data.tags,
            createdDate: v.data.createdDate,
            modifiedDate: v.data.modifiedDate,
            language: v.data.language,
            enrolled: v.data.enrolled,
            likes: v.data.likes,
        })
    });
};
exports.handleCourseCommand = (msg, ws) => __awaiter(this, void 0, void 0, function* () {
    Option_1.fromNullable(courses_1.default[msg.method]).map((Constructor) => __awaiter(this, void 0, void 0, function* () {
        const command = new Constructor(JSON_1.fromJSON(msg.data));
        if (command instanceof courses_1.default.Create) {
            const course = command.data.course;
            const response = yield course_1.default.create({ data: course });
            Option_1.fromNullable(response).map(response => {
                user_1.addCourseToUserCourses(response);
                configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: msg.id,
                    data: [1, new entities_1.ServerResponseObjectResolved({
                            data: constructCourse(response)
                        })]
                }));
            });
        }
        else if (command instanceof courses_1.default.List) {
            Option_1.fromNullable(command.data.userId).map((userId) => __awaiter(this, void 0, void 0, function* () {
                const response = yield course_1.default.find({ 'data.owner.value': userId.value });
                configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: msg.id,
                    data: [1, new entities_1.ServerResponseObjectsListResolved({
                            data: response.map(response => constructCourse(response))
                        })]
                }));
            }));
        }
        else if (command instanceof courses_1.default.Update) {
            const courseMe = command.data.courseMe;
            const response = yield course_1.default.findByIdAndUpdate(courseMe.id.value, { data: courseMe.entity }, { new: true });
            configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: msg.id,
                data: [1, new entities_1.ServerResponseObjectResolved({
                        data: constructCourse(response)
                    })]
            }));
        }
        else if (command instanceof courses_1.default.Delete) {
            Option_1.fromNullable(command.data.courseId).map((courseId) => __awaiter(this, void 0, void 0, function* () {
                const response = yield course_1.default.findByIdAndRemove(courseId.value);
                Option_1.fromNullable(response).map(response => {
                    user_1.removeCourseFromUserCourses(response);
                    configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                        msgId: msg.id,
                        data: [1, new entities_1.ServerResponseObjectResolved({
                                data: new entities_1.Id({ value: response._id })
                            })]
                    }));
                });
            }));
        }
        else if (command instanceof courses_1.default.Request) {
            const courseId = command.data.courseId;
            const response = yield course_1.default.findById(courseId);
            configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: msg.id,
                data: [1, new entities_1.ServerResponseObjectsListResolved({
                        data: [constructCourse(response)]
                    })]
            }));
        }
        else if (command instanceof courses_1.default.ListAll) {
            const response = yield course_1.default.find();
            configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: msg.id,
                data: [1, new entities_1.ServerResponseObjectsListResolved({
                        data: response.map(response => constructCourse(response))
                    })]
            }));
        }
        else if (command instanceof courses_1.default.ListIds) {
            Option_1.fromNullable(command.data.courseIds).map((courseIds) => __awaiter(this, void 0, void 0, function* () {
                const response = yield course_1.default.find().where('_id').in(courseIds.map(v => v.value));
                Option_1.fromNullable(response).map(response => configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: msg.id,
                    data: [1, new entities_1.ServerResponseObjectsListResolved({
                            data: response.map(response => constructCourse(response))
                        })]
                })));
            }));
        }
    }));
});
//# sourceMappingURL=courses.js.map