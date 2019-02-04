"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = require("../api/protocol/search");
const Option_1 = require("fp-ts/lib/Option");
const JSON_1 = require("../api/protocol/JSON");
const entities_1 = require("../api/entities");
const configWebSocket_1 = require("../config/configWebSocket");
const course_1 = require("../models/course");
const getSearchResultByExpression = (query) => __awaiter(this, void 0, void 0, function* () {
    switch (query.expression.tpe) {
        case entities_1.ExpressionEq.$Type:
            return yield course_1.default.find({ 'data.name.value': query.value });
        case entities_1.ExpressionContains.$Type:
            return yield yield course_1.default.find({ 'data.name.value': { "$regex": query.value, "$options": "i" } });
    }
});
exports.handleSearchCommand = (parsedMsg, ws) => __awaiter(this, void 0, void 0, function* () {
    Option_1.fromNullable(search_1.default[parsedMsg.method]).map((Constructor) => __awaiter(this, void 0, void 0, function* () {
        const command = new Constructor(JSON_1.fromJSON(parsedMsg.data));
        if (command instanceof search_1.default.SimpleSearch) {
            Option_1.fromNullable(command.data.query).map((query) => __awaiter(this, void 0, void 0, function* () {
                const dbResponse = yield getSearchResultByExpression(query);
                configWebSocket_1.wsSend(ws, new entities_1.ServerResponse({
                    msgId: parsedMsg.id,
                    data: [1, new entities_1.ServerResponseObjectsListResolved({
                            data: dbResponse.map(v => new entities_1.ME({
                                id: new entities_1.Id({ value: v._id }),
                                entity: new entities_1.Course({
                                    name: v.data.name,
                                    data: v.data.data,
                                    owner: v.data.owner,
                                    picture: v.data.picture,
                                    description: v.data.description,
                                    shortDescription: v.data.shortDescription,
                                    tags: v.data.tags,
                                    createdDate: v.data.createdDate,
                                    modifiedDate: v.data.modifiedDate,
                                    language: v.data.language,
                                    enrolled: v.data.enrolled,
                                    likes: v.data.likes,
                                })
                            }))
                        })]
                }));
            }));
        }
    }));
});
//# sourceMappingURL=search.js.map