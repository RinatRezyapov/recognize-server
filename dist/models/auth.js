"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
let authSchema = mongoose.Schema({
    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});
authSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
authSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};
exports.default = mongoose.model('Auth', authSchema);
//# sourceMappingURL=auth.js.map