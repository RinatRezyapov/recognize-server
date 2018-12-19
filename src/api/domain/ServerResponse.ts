import ProtocolObject from './ProtocolObject';
import TypeId from './TypeId';

export class ServerResponse extends ProtocolObject {
  static $Type = new TypeId<ServerResponse>({value: 'ServerMessage.ServerResponse'});
  
  msgId: string;
  data: any;

  constructor({ msgId, data }: { msgId: string, data: any }) {
    super({ tpe: ServerResponse.$Type });
    this.msgId = msgId;
    this.data = data;
  }
}


export class ServerResponseObjectResolved extends ProtocolObject {
  static $Type = new TypeId<ServerResponseObjectResolved>({value: 'ServerResponse.ObjectResolved'});

  data: Object;

  constructor({ data }: { data: Object }) {
    super({ tpe: ServerResponseObjectResolved.$Type });
    this.data = data;
  }
}

export class ServerResponseObjectsListResolved extends ProtocolObject {
  static $Type = new TypeId<ServerResponseObjectsListResolved>({value: 'ServerResponse.ObjectsListResolved'});

  data: Array<any>;

  constructor({ data }: { data: Array<any> }) {
    super({ tpe: ServerResponseObjectsListResolved.$Type });
    this.data = data;
  }
}