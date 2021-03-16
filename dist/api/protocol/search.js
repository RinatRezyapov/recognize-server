"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleSearch = void 0;
const ProtocolCommand_1 = require("./ProtocolCommand");
class SimpleSearch extends ProtocolCommand_1.default {
    constructor({ query }) {
        super('Search', 'SimpleSearch', { query });
    }
}
exports.SimpleSearch = SimpleSearch;
exports.default = {
    serviceName: "Search",
    SimpleSearch,
};
//# sourceMappingURL=search.js.map