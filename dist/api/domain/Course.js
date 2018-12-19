"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolObject_1 = require("./ProtocolObject");
const TypeId_1 = require("./TypeId");
class Course extends ProtocolObject_1.default {
    constructor({ name, data, owner, picture, description, shortDescription, tags, createdDate, modifiedDate, language, enrolled, likes, }) {
        super({ tpe: Course.$Type });
        this.name = name;
        this.data = data;
        this.owner = owner;
        this.picture = picture;
        this.description = description;
        this.shortDescription = shortDescription;
        this.tags = tags;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.language = language;
        this.enrolled = enrolled;
        this.likes = likes;
    }
}
Course.$Type = new TypeId_1.default({ value: 'Course' });
exports.default = Course;
//# sourceMappingURL=Course.js.map