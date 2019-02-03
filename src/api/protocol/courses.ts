import ProtocolCommand from './ProtocolCommand';
import { Course, ME, Id, User } from '../entities';
import { fromJSON } from './JSON';

export class Create extends ProtocolCommand {
  constructor({ course }: { course: Course }) {
    super('Courses', 'Create', { course })
  }
}

export class List extends ProtocolCommand {
  constructor({ userId }: { userId: Id<User> }) {
    super('Courses', 'List', { userId })
  }
}

export class Update extends ProtocolCommand {
  constructor({ courseMe }: { courseMe: ME<Course> }) {
    super('Courses', 'Update', { courseMe })
  }
}

export class Delete extends ProtocolCommand {
  constructor({ courseId }: { courseId: Id<Course> }) {
    super('Courses', 'Delete', { courseId })
  }
}

export class Request extends ProtocolCommand {
  constructor({ courseId }: { courseId: Id<Course> }) {
    super('Courses', 'Request', { courseId })
  }
}

export class ListAll extends ProtocolCommand {
  constructor() {
    super('Courses', 'ListAll', {})
  }
}

export class ListIds extends ProtocolCommand {
  constructor({ courseIds }: { courseIds: Array<Id<Course>> }) {
    super('Courses', 'ListIds', { courseIds })
  }
}

export default {
  serviceName: "Courses",
  List,
  Update,
  Create,
  Delete,
  Request,
  ListAll,
  ListIds,
}