"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJSON = void 0;
const lodash = require("lodash");
const typeConstructors_1 = require("../typeConstructors");
const fromJSON = (data) => {
    const typeOf = typeof data;
    if (!data) {
        return data;
    }
    else if (typeOf === 'string') {
        return data;
    }
    else if (typeOf === 'number') {
        return data;
    }
    else if (typeOf === 'boolean') {
        return data;
    }
    else if (data instanceof Array) {
        return fromJSONArray(data);
    }
    else if (!data.hasOwnProperty("tpe")) {
        return Object.keys(data).reduce((acc, curr) => ({ ...acc, [curr]: exports.fromJSON(data[curr]) }), {});
    }
    else {
        return fromJSONObject(data);
    }
};
exports.fromJSON = fromJSON;
const fromJSONArray = (data) => {
    return data.map(v => exports.fromJSON(v));
};
const fromJSONObject = (data = {}) => {
    const typeConstructor = typeConstructors_1.default[data.tpe.value];
    if (!typeConstructor) {
        throw new Error(`Undefined typeConstructor ${data.tpe.value}`);
    }
    const tpeOmmitedData = lodash.omit(data, ['tpe']);
    const subKeys = lodash.mapValues(tpeOmmitedData, value => exports.fromJSON(value));
    return new typeConstructor(subKeys);
};
//# sourceMappingURL=JSON.js.map