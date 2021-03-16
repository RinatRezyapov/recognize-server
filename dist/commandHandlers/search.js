"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSearchCommand = void 0;
const search_1 = require("../api/protocol/search");
const Option_1 = require("fp-ts/lib/Option");
const JSON_1 = require("../api/protocol/JSON");
const entities_1 = require("../api/entities");
const configWebSocket_1 = require("../config/configWebSocket");
const course_1 = require("../models/course");
const getSearchResultByExpression = async (query) => {
    switch (query.expression.tpe) {
        case entities_1.ExpressionEq.$Type:
            return await course_1.default.find({ 'data.name.value': query.value });
        case entities_1.ExpressionContains.$Type:
            return await await course_1.default.find({ 'data.name.value': { "$regex": query.value, "$options": "i" } });
    }
};
const handleSearchCommand = async (parsedMsg, ws) => {
    Option_1.fromNullable(search_1.default[parsedMsg.method]).map(async (Constructor) => {
        const command = new Constructor(JSON_1.fromJSON(parsedMsg.data));
        if (command instanceof search_1.default.SimpleSearch) {
            Option_1.fromNullable(command.data.query).map(async (query) => {
                const dbResponse = await getSearchResultByExpression(query);
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
            });
        }
    });
};
exports.handleSearchCommand = handleSearchCommand;
//# sourceMappingURL=search.js.map