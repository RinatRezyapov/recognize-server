"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    data: String,
    contentType: String
});
exports.default = mongoose.model('Files', schema);
//# sourceMappingURL=files.js.map