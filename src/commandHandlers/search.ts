import ProtocolSearch from '../api/protocol/search';
import { fromNullable } from 'fp-ts/lib/Option';
import ProtocolCommand from '../api/protocol/ProtocolCommand';
import { fromJSON } from '../api/protocol/JSON';
import {
  Id,
  ServerResponse,
  SearchQuery,
  ServerResponseObjectsListResolved,
  Course,
  ME,
  ExpressionEq,
  ExpressionContains,
  Expression,
} from '../api/entities';
import { wsSend } from '../config/configWebSocket';
import CourseModel from '../models/course';

const getSearchResultByExpression = async (query: SearchQuery) => {
  switch(query.expression.tpe) {
    case ExpressionEq.$Type:
      return await CourseModel.find({ 'data.name.value': query.value })
    case ExpressionContains.$Type:
      return await await CourseModel.find({ 'data.name.value': { "$regex": query.value, "$options": "i" } })
  }
}

export const handleSearchCommand = async (parsedMsg: ProtocolCommand, ws: any) => {

  fromNullable(ProtocolSearch[parsedMsg.method]).map(async Constructor => {
    const command = new Constructor(fromJSON(parsedMsg.data));
    if (command instanceof ProtocolSearch.SimpleSearch) {
      fromNullable(command.data.query).map(async (query: SearchQuery) => {
        const dbResponse = await getSearchResultByExpression(query);
        wsSend(
          ws,
          new ServerResponse({
            msgId: parsedMsg.id,
            data: [1, new ServerResponseObjectsListResolved({
              data: dbResponse.map(v =>
                new ME<Course>({
                  id: new Id<Course>({ value: v._id }),
                  entity: new Course({
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
                })
              )
            })]
          })
        )
      })
    }
  })
}