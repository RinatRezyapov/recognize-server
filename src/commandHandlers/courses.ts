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
import UserModel from '../models/user';
import { wsSend } from '../config/configWebSocket';
import { addCourseToUserCourses, removeCourseFromUserCourses } from './user';

const constructCourse = (v) => {
  return new ME<Course>({
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
}


export const handleCourseCommand = async (msg: ProtocolCommand, ws: any) => {

  fromNullable(ProtocolCourses[msg.method]).map(async Constructor => {
    const command = new Constructor(fromJSON(msg.data));
    if (command instanceof ProtocolCourses.Create) {
      const course = command.data.course as Course;
      const response = await CourseModel.create({ data: course });
      fromNullable(response).map(response => {
        addCourseToUserCourses(response);
        wsSend(
          ws,
          new ServerResponse({
            msgId: msg.id,
            data: [1, new ServerResponseObjectResolved({
              data: constructCourse(response)
            })]
          })
        )
      })
    } else if (command instanceof ProtocolCourses.List) {
      fromNullable(command.data.userId).map(async (userId: Id<User>) => {
        const response = await CourseModel.find({ 'data.owner.value': userId.value });
        wsSend(
          ws,
          new ServerResponse({
            msgId: msg.id,
            data: [1, new ServerResponseObjectsListResolved({
              data: response.map(response =>
                constructCourse(response)
              )
            })]
          })
        )
      })
    } else if (command instanceof ProtocolCourses.Update) {
      const courseMe = command.data.courseMe as ME<Course>;
      const response = await CourseModel.findByIdAndUpdate(courseMe.id.value, { data: courseMe.entity }, { new: true });
      wsSend(
        ws,
        new ServerResponse({
          msgId: msg.id,
          data: [1, new ServerResponseObjectResolved({
            data: constructCourse(response)
          })]
        })
      )
    } else if (command instanceof ProtocolCourses.Delete) {
      fromNullable(command.data.courseId).map(async (courseId: Id<Course>) => {
        const response = await CourseModel.findByIdAndRemove(courseId.value);
        fromNullable(response).map(response => {
          removeCourseFromUserCourses(response);
          wsSend(
            ws,
            new ServerResponse({
              msgId: msg.id,
              data: [1, new ServerResponseObjectResolved({
                data: new Id<Course>({ value: response._id })
              })]
            })
          )
        })
      })
    } else if (command instanceof ProtocolCourses.Request) {
      const courseId = command.data.courseId as Id<Course>;
      const response = await CourseModel.findById(courseId);

      wsSend(
        ws,
        new ServerResponse({
          msgId: msg.id,
          data: [1, new ServerResponseObjectsListResolved({
            data: [constructCourse(response)]
          })]
        })
      )
    } else if (command instanceof ProtocolCourses.ListAll) {
      const response = await CourseModel.find();

      wsSend(
        ws,
        new ServerResponse({
          msgId: msg.id,
          data: [1, new ServerResponseObjectsListResolved({
            data: response.map(response =>
              constructCourse(response)
            )
          })]
        })
      )
    } else if (command instanceof ProtocolCourses.ListIds) {
      fromNullable(command.data.courseIds).map(async (courseIds: Array<Id<Course>>) => {
        const response = await CourseModel.find().where('_id').in(courseIds.map(v => v.value));
        fromNullable(response).map(response =>
          wsSend(
            ws,
            new ServerResponse({
              msgId: msg.id,
              data: [1, new ServerResponseObjectsListResolved({
                data: response.map(response =>
                  constructCourse(response)
                )
              })]
            })
          )
        )
      })
    }
  });
}