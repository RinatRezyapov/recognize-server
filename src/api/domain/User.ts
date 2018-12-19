import ProtocolObject from './ProtocolObject';
import TypeId from './TypeId';
import Id from './Id';

export default class User extends ProtocolObject {
  static $Type = new TypeId<User>({value: 'User'});
  name: string;
  email: string;
  avatar: string;

  constructor({ name, email, avatar }: { name: string, email: string, avatar: string }) {
    super({ tpe: User.$Type });
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }
}
