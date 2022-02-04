import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'ws';
import { Socket } from "socket.io";

import { BuildListener } from './build_listener';

interface compileRequestEvent {
  code: string;
  execute: boolean;
}

@WebSocketGateway()
export class BuildGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private buildListener: BuildListener | null = null;
  private logger: Logger = new Logger('BuildGateway');

  @SubscribeMessage('compile-request')
  async handleCompileRequest(client: Socket, event: compileRequestEvent): Promise<void> {
    if (this.buildListener === null) {
      this.buildListener = await BuildListener.create(event.code, ''); // TODO : a changer

      client.send(
        JSON.stringify({
          state: 1,
          executeLink: this.buildListener.getExecuteLink(),
          compileLink: this.buildListener.getCompileLink(),
        })
      );
      const hasCompiled = await this.buildListener.build();

      client.send(JSON.stringify({ state: 2, hasCompiled }));

      if (hasCompiled && event.execute) {
        await this.buildListener.execute();
        client.send(JSON.stringify({ state: 3, hasExecuted: this.buildListener.isExecuted() }));
      }
      this.removeDocker();
    }
  }

  handleDisconnect(_client: WebSocket) {
    this.logger.log(`Disconnected`);
    this.removeDocker();
  }

  handleConnection(_client: WebSocket, ..._args: any[]) {
    this.logger.log(`WebSocket Client sucessfully connected`);
  }

  private removeDocker() {
    if (this.buildListener != null) {
      this.buildListener.destroyDocker();
      this.buildListener = null;
    }
  }
}
