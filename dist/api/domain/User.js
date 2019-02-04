"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolObject_1 = require("./ProtocolObject");
const TypeId_1 = require("./TypeId");
class User extends ProtocolObject_1.default {
    constructor({ name, email, avatar, joinedDate, courses, followers, following, }) {
        super({ tpe: User.$Type });
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.joinedDate = joinedDate;
        this.courses = courses;
        this.followers = followers;
        this.following = following;
    }
}
User.$Type = new TypeId_1.default({ value: 'User' });
exports.default = User;
//# sourceMappingURL=User.js.map