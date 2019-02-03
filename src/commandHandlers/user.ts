import ProtocolUser from '../api/protocol/user';
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
import UserModel from '../models/user';
import { wsSend } from '../config/configWebSocket';

export const handleUserCommand = async (msg: ProtocolCommand, ws: any) => {
  fromNullable(ProtocolUser[msg.method]).map(async Constructor => {
    const command = new Constructor(fromJSON(msg.data));
    if (command instanceof ProtocolUser.Create) {

    } else if (command instanceof ProtocolUser.Request) {
      fromNullable(command.data.userId).map(async (userId: Id<User>) => {
        const response = await UserModel.findById(userId.value);
        fromNullable(response).map(response =>
          wsSend(
            ws,
            new ServerResponse({
              msgId: msg.id,
              data: [1, new ServerResponseObjectResolved({
                data: constructUser(response)
              })]
            })
          )
        )
      })
    } else if (command instanceof ProtocolUser.List) {
      const response = await UserModel.find();
      fromNullable(response).map(response =>
        wsSend(
          ws,
          new ServerResponse({
            msgId: msg.id,
            data: [1, new ServerResponseObjectsListResolved({
              data: response.map(response =>
                constructUser(response)
              )
            })]
          })
        )
      )
    } else if (command instanceof ProtocolUser.Update) {
      fromNullable(command.data.userMe).map(async (userMe: ME<User>) => {
        const response = await UserModel.findByIdAndUpdate(userMe.id.value, { data: userMe.entity }, { new: true });
        fromNullable(response).map(response =>
          wsSend(
            ws,
            new ServerResponse({
              msgId: msg.id,
              data: [1, new ServerResponseObjectResolved({
                data: constructUser(response)
              })]
            })
          )
        )
      })
    } else if (command instanceof ProtocolUser.Delete) {

    } else if (command instanceof ProtocolUser.ListById) {
      fromNullable(command.data.userIds).map(async (userIds: Array<Id<User>>) => {
        const response = await UserModel.find().where('_id').in(userIds.map(v => v.value));
        fromNullable(response).map(response =>
          wsSend(
            ws,
            new ServerResponse({
              msgId: msg.id,
              data: [1, new ServerResponseObjectsListResolved({
                data: response.map(response =>
                  constructUser(response)
                )
              })]
            })
          )
        )
      })
    }
  });
}

const constructUser = (v) => {
  return new ME<User>({
    id: new Id<User>({ value: v._id }),
    entity: new User({
      name: v.data.name,
      email: v.data.email,
      avatar: v.data.avatar,
      joinedDate: v.data.joinedDate,
      courses: v.data.courses,
      followers: v.data.followers,
      following: v.data.following,
    })
  })
}

export const addCourseToUserCourses = (response) => {
  UserModel.findById(response.data.owner.value, (err, user) => {
    if (err) return console.log(err);
    user.data.courses[user.data.courses.length] = new Id<Course>({ value: response._id });
    user.markModified('data.courses');
    user.save();
  });
}

export const removeCourseFromUserCourses = (response) => {
  UserModel.findById(response.data.owner.value, (err, user) => {
    if (err) return console.log(err);
    const idx = user.data.courses.findIndex(el => el.value.toString() === response._id.toString());
    if (idx !== -1) {
      const newCourses = [...user.data.courses.slice(0, idx), ...user.data.courses.slice(idx + 1)];
      user.data.courses = newCourses;
      user.markModified('data.courses');
      user.save();
    }
  })
}