import * as ws from 'ws';
import * as http from 'http';
import * as WebSocket from '../WebSocket';
import ProtocolCourses from '../api/protocol/courses';
import ProtocolUser from '../api/protocol/user';
import ProtocolFiles from '../api/protocol/files';
import ProtocolSearch from '../api/protocol/search';
import { handleCourseCommand } from '../commandHandlers/courses';
import { handleUserCommand } from '../commandHandlers/user';
import { handleFilesCommand } from '../commandHandlers/files';
import { handleSearchCommand } from '../commandHandlers/search';
import { fromNullable } from 'fp-ts/lib/Option';
import { ServerResponse } from '../api/entities';

export const configWebSocket = (server) => {
  const wss = new ws.Server({ server });

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (msg: WebSocket.Data) => {
        if (typeof msg === 'string') {
          console.log('----Request----: ' + msg);
          const parsedMsg = JSON.parse(msg as string);
          fromNullable(parsedMsg.service).map((commandService: string) => {
            switch (commandService) {
              case ProtocolCourses.serviceName:
                handleCourseCommand(parsedMsg, ws)
                break;
              case ProtocolUser.serviceName:
                handleUserCommand(parsedMsg, ws)
                break;
              case ProtocolFiles.serviceName:
                handleFilesCommand(parsedMsg, ws)
                break;
              case ProtocolSearch.serviceName:
                handleSearchCommand(parsedMsg, ws)
                break;
            }
          })
        } else {
          console.log('Error parsing message', msg)
        }
    });
    ws.on('close', (code: number, reason: string) => {

    });
    ws.on('error', (err: Error) => {

    })
    ws.on('upgrade', (request: http.IncomingMessage) => {

    });
    ws.on('open', () => {

    });
    ws.on('ping', (data: Buffer) => {

    });
    ws.on('pong', (data: Buffer) => {

    });
    ws.on('unexpected-response', (request: http.ClientRequest, response: http.IncomingMessage) => {

    });
  });
}

export const wsSend = (ws: WebSocket, response: ServerResponse) => {
    const stringifiedResponse = JSON.stringify(response);
    console.log('----Response----: ' + stringifiedResponse);
    ws.send(stringifiedResponse);
}