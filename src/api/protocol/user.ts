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

export class Update extends ProtocolCommand {
  constructor({ courseMe }: { courseMe: ME<User> }) {
    super('User', 'Update', { courseMe })
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
  Update,
  Create,
  Delete,
}