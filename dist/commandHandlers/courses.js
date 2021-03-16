"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCourseCommand = void 0;
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
const handleCourseCommand = async (msg, ws) => {
    Option_1.fromNullable(courses_1.default[msg.method]).map(async (Constructor) => {
        const command = new Constructor(JSON_1.fromJSON(msg.data));
        if (command instanceof courses_1.default.Create) {
            const course = command.data.course;
            const response = await course_1.default.create({ data: course });
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
            Option_1.fromNullable(command.data.userId).map(async (userId) => {
                const response = await course_1.default.find({ 'data.owner.value': userId.value });
                configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: msg.id,
                    data: [1, new entities_1.ServerResponseObjectsListResolved({
                            data: response.map(response => constructCourse(response))
                        })]
                }));
            });
        }
        else if (command instanceof courses_1.default.Update) {
            const courseMe = command.data.courseMe;
            const response = await course_1.default.findByIdAndUpdate(courseMe.id.value, { data: courseMe.entity }, { new: true });
            configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: msg.id,
                data: [1, new entities_1.ServerResponseObjectResolved({
                        data: constructCourse(response)
                    })]
            }));
        }
        else if (command instanceof courses_1.default.Delete) {
            Option_1.fromNullable(command.data.courseId).map(async (courseId) => {
                const response = await course_1.default.findByIdAndRemove(courseId.value);
                Option_1.fromNullable(response).map(response => {
                    user_1.removeCourseFromUserCourses(response);
                    configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                        msgId: msg.id,
                        data: [1, new entities_1.ServerResponseObjectResolved({
                                data: new entities_1.Id({ value: response._id })
                            })]
                    }));
                });
            });
        }
        else if (command instanceof courses_1.default.Request) {
            const courseId = command.data.courseId;
            const response = await course_1.default.findById(courseId);
            configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: msg.id,
                data: [1, new entities_1.ServerResponseObjectsListResolved({
                        data: [constructCourse(response)]
                    })]
            }));
        }
        else if (command instanceof courses_1.default.ListAll) {
            const response = await course_1.default.find();
            configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                msgId: msg.id,
                data: [1, new entities_1.ServerResponseObjectsListResolved({
                        data: response.map(response => constructCourse(response))
                    })]
            }));
        }
        else if (command instanceof courses_1.default.ListIds) {
            Option_1.fromNullable(command.data.courseIds).map(async (courseIds) => {
                const response = await course_1.default.find().where('_id').in(courseIds.map(v => v.value));
                Option_1.fromNullable(response).map(response => configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: msg.id,
                    data: [1, new entities_1.ServerResponseObjectsListResolved({
                            data: response.map(response => constructCourse(response))
                        })]
                })));
            });
        }
    });
};
exports.handleCourseCommand = handleCourseCommand;
//# sourceMappingURL=courses.js.map