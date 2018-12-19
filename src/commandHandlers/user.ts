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

export const handleUserCommand = async (parsedMsg: ProtocolCommand, ws: any) => {

  fromNullable(ProtocolUser[parsedMsg.method]).map(async Constructor => {
    const command = new Constructor(fromJSON(parsedMsg.data));
    if (command instanceof ProtocolUser.Create) {

    } else if (command instanceof ProtocolUser.Request) {
      fromNullable(command.data.userId).map(async (userId: Id<User>) => {
        const userDbResponse = await UserModel.findById(userId.value);
        fromNullable(userDbResponse).map(v =>
          wsSend(
            ws,
            new ServerResponse({
              msgId: parsedMsg.id,
              data: [1, new ServerResponseObjectResolved({
                data: new ME<User>({
                  id: new Id<User>({ value: v._id }),
                  entity: new User({ name: v.data.name, email: v.data.email, avatar: v.data.avatar })
                })
              })]
            })
          )
        )
      })
    } else if (command instanceof ProtocolUser.Update) {

    } else if (command instanceof ProtocolUser.Delete) {

    }
  });
}