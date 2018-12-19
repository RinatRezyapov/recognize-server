import ProtocolCourses from '../api/protocol/courses';
import { fromNullable } from 'fp-ts/lib/Option';
import ProtocolCommand from '../api/protocol/ProtocolCommand';
import { fromJSON } from '../api/protocol/JSON';
import {
  Id,
  User,
  Course,
  ME,
  ServerResponse,
  ServerResponseObjectResolved,
  ServerResponseObjectsListResolved,
} from '../api/entities';
import CourseModel from '../models/course';
import { wsSend } from '../config/configWebSocket';

export const handleCourseCommand = async (parsedMsg: ProtocolCommand, ws: any) => {

  fromNullable(ProtocolCourses[parsedMsg.method]).map(async Constructor => {
    const command = new Constructor(fromJSON(parsedMsg.data));
    if (command instanceof ProtocolCourses.Create) {
      const course = command.data.course as Course;
      const dbResponse = await CourseModel.create({ data: course });
      wsSend(
        ws,
        new ServerResponse({
          msgId: parsedMsg.id,
          data: [1, new ServerResponseObjectResolved({
            data: new ME<Course>({ id: new Id<Course>({ value: dbResponse._id }), entity: dbResponse.data })
          })]
        })
      )
    } else if (command instanceof ProtocolCourses.List) {
      fromNullable(command.data.userId).map(async (userId: Id<User>) => {
        const dbResponse = await CourseModel.find({ 'data.owner.value': userId.value });
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
    } else if (command instanceof ProtocolCourses.Update) {
      const courseMe = command.data.courseMe as ME<Course>;
      const dbResponse = await CourseModel.findByIdAndUpdate(courseMe.id.value, { data: courseMe.entity }, { new: true });

      wsSend(
        ws,
        new ServerResponse({
          msgId: parsedMsg.id,
          data: [1, new ServerResponseObjectResolved({
            data: new ME<Course>({ id: new Id<Course>({ value: dbResponse._id }), entity: dbResponse.data })
          })]
        })
      )
    } else if (command instanceof ProtocolCourses.Delete) {
      fromNullable(command.data.courseId).map(async (courseId: Id<Course>) => {
        const dbResponse = await CourseModel.findByIdAndRemove(courseId.value);
        wsSend(
          ws,
          new ServerResponse({
            msgId: parsedMsg.id,
            data: [1, new ServerResponseObjectResolved({
              data: new Id<Course>({ value: dbResponse._id })
            })]
          })
        )
      })
    }
  });
}