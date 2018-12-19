import * as uuid from 'uuid';

class ProtocolCommand {

  id: string;
  service: string;
  method: string;
  data: any;

  constructor(
    service: string,
    method: string,
    data?: any,
  ) {
    this.id = uuid.v4();
    this.service = service;
    this.method = method;
    this.data = data || {};
  }
}

export default ProtocolCommand;
