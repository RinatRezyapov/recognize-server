"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entities = require("./entities");
const typeConstructors = Object.keys(Entities).reduce((types, key) => {
    if (Entities[key].$Type) {
        types[Entities[key].$Type.value] = Entities[key];
    }
    return types;
}, {});
exports.default = typeConstructors;
//# sourceMappingURL=typeConstructors.js.map