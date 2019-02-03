import ProtocolCommand from './ProtocolCommand';
import { Course, ME, Id, User } from '../entities';
import { fromJSON } from './JSON';

export class Create extends ProtocolCommand {
  constructor({ user }: { user: User }) {
    super('User', 'Create', { user })
  }
}

export class Request extends ProtocolCommand {
  constructor({ userId }: { userId: Id<User> }) {
    super('User', 'Request', { userId })
  }
}

export class List extends ProtocolCommand {
  constructor() {
    super('User', 'List');
  }
}

export class ListById extends ProtocolCommand {
    constructor({ userIds }: { userIds: Array<Id<User>> }) {
      super('User', 'ListById', { userIds });
    }
}

export class Update extends ProtocolCommand {
  constructor({ userMe }: { userMe: ME<User> }) {
    super('User', 'Update', { userMe })
  }
}

export class Delete extends ProtocolCommand {
  constructor({ userId }: { userId: Id<User> }) {
    super('User', 'Delete', { userId })
  }
}

export default {
  serviceName: "User",
  Request,
  List,
  Update,
  Create,
  Delete,
  ListById,
}