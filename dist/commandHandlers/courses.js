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
exports.handleCourseCommand = (parsedMsg, ws) => __awaiter(this, void 0, void 0, function* () {
    Option_1.fromNullable(courses_1.default[parsedMsg.method]).map((Constructor) => __awaiter(this, void 0, void 0, function* () {
        const command = new Constructor(JSON_1.fromJSON(parsedMsg.data));
        if (command instanceof courses_1.default.Create) {
            const course = command.data.course;
            const dbResponse = yield course_1.default.create({ data: course });
            configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: parsedMsg.id,
                data: [1, new entities_1.ServerResponseObjectResolved({
                        data: new entities_1.ME({ id: new entities_1.Id({ value: dbResponse._id }), entity: dbResponse.data })
                    })]
            }));
        }
        else if (command instanceof courses_1.default.List) {
            Option_1.fromNullable(command.data.userId).map((userId) => __awaiter(this, void 0, void 0, function* () {
                const dbResponse = yield course_1.default.find({ 'data.owner.value': userId.value });
                configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: parsedMsg.id,
                    data: [1, new entities_1.ServerResponseObjectsListResolved({
                            data: dbResponse.map(v => new entities_1.ME({
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
                            }))
                        })]
                }));
            }));
        }
        else if (command instanceof courses_1.default.Update) {
            const courseMe = command.data.courseMe;
            const dbResponse = yield course_1.default.findByIdAndUpdate(courseMe.id.value, { data: courseMe.entity }, { new: true });
            configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: parsedMsg.id,
                data: [1, new entities_1.ServerResponseObjectResolved({
                        data: new entities_1.ME({ id: new entities_1.Id({ value: dbResponse._id }), entity: dbResponse.data })
                    })]
            }));
        }
        else if (command instanceof courses_1.default.Delete) {
            Option_1.fromNullable(command.data.courseId).map((courseId) => __awaiter(this, void 0, void 0, function* () {
                const dbResponse = yield course_1.default.findByIdAndRemove(courseId.value);
                configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: parsedMsg.id,
                    data: [1, new entities_1.ServerResponseObjectResolved({
                            data: new entities_1.Id({ value: dbResponse._id })
                        })]
                }));
            }));
        }
    }));
});
//# sourceMappingURL=courses.js.map