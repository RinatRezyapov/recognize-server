"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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