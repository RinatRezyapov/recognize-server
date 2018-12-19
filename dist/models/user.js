"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    _id: String,
    data: mongoose.Schema.Types.Mixed,
}, { _id: false });
exports.default = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map