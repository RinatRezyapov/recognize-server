"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
    data: mongoose.Schema.Types.Mixed,
});
exports.default = mongoose.model('Course', courseSchema);
//# sourceMappingURL=course.js.map