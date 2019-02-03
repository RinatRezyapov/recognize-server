import ProtocolFiles from '../api/protocol/files';
import { fromNullable } from 'fp-ts/lib/Option';
import ProtocolCommand from '../api/protocol/ProtocolCommand';
import { fromJSON } from '../api/protocol/JSON';
import {
  Id,
  ServerResponse,
  ServerResponseObjectResolved,
} from '../api/entities';
import { wsSend } from '../config/configWebSocket';
import FilesModel from '../models/files';

export const handleFilesCommand = async (parsedMsg: ProtocolCommand, ws: any) => {

  fromNullable(ProtocolFiles[parsedMsg.method]).map(async Constructor => {
    const command = new Constructor(fromJSON(parsedMsg.data));
    if (command instanceof ProtocolFiles.Send) {
      const response = await FilesModel.create({ data: parsedMsg.data.file, contentType: 'image/png' });
      fromNullable(response).map(v =>
        wsSend(
          ws,
          new ServerResponse({
            msgId: parsedMsg.id,
            data: [1, new ServerResponseObjectResolved({
              data: new Id<File>({ value: response.id })
            })]
          })
        )
      )
    }
  })
}

export const handleFilesApi = (req, res) => {
  FilesModel.findById(req.params.id).then(response => {
    var data = response.data.split(",")[1];
    var dataBuffer = new Buffer(data, 'base64');
    res.writeHead(200, {
      'Content-Type': response.contentType,
      'Content-Length': dataBuffer.length
    });
    res.end(dataBuffer); 
  })
}