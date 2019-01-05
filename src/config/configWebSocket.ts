import * as ws from 'ws';
import * as http from 'http';
import * as WebSocket from '../WebSocket';
import ProtocolCourses from '../api/protocol/courses';
import ProtocolUser from '../api/protocol/user';
import { handleCourseCommand } from '../commandHandlers/courses';
import { handleUserCommand } from '../commandHandlers/user';
import { fromNullable } from 'fp-ts/lib/Option';
import { ServerResponse } from '../api/entities';

export const configWebSocket = (server) => {
  const wss = new ws.Server({ server });

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (msg: WebSocket.Data) => {
      const parsedMsg = JSON.parse(msg as string);
      fromNullable(parsedMsg.service).map((commandService: string) => {
        switch (commandService) {
          case ProtocolCourses.serviceName:
            handleCourseCommand(parsedMsg, ws)
            break;
          case ProtocolUser.serviceName:
            handleUserCommand(parsedMsg, ws)
            break;
        }
      })

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
    ws.send(JSON.stringify(response));
}