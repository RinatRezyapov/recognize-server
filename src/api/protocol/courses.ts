import ProtocolCommand from './ProtocolCommand';
import { Course, ME, Id, User } from '../entities';
import { fromJSON } from './JSON';

export class Create extends ProtocolCommand {
  constructor({ course }: { course: Course }) {
    super('EventLines', 'Create', { course })
  }
}

export class List extends ProtocolCommand {
  constructor({ userId }: { userId: Id<User> }) {
    super('EventLines', 'List', { userId })
  }
}

export class Update extends ProtocolCommand {
  constructor({ courseMe }: { courseMe: ME<Course> }) {
    super('EventLines', 'Update', { courseMe })
  }
}

export class Delete extends ProtocolCommand {
  constructor({ courseId }: { courseId: Id<Course> }) {
    super('EventLines', 'Delete', { courseId })
  }
}

export default {
  serviceName: "Courses",
  List,
  Update,
  Create,
  Delete,
}