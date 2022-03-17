import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'ws';
import BuildListener from './build_listener';

interface CompileRequestEvent {
  code: string;
  execute: boolean;
}

@WebSocketGateway()
export class BuildGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private buildListener: BuildListener | null = null;
  private logger: Logger = new Logger('BuildGateway');
  private execute = false;

  @SubscribeMessage('compile-request')
  async handleCompileRequest(client: any, event: CompileRequestEvent): Promise<void> {
    if (this.buildListener !== null) {
      return;
    }
    this.buildListener = await BuildListener.create(
      event.code,
      `
    {
      "exercice": [
          {
              "entree": ["30"],
              "sorties": ["a"],
              "maxtime": 30000,
              "maxmemory": 10
          },
          {
              "entree": ["8"],
              "sorties": ["a"],
              "maxtime": 30000,
              "maxmemory": 10
          }
      ]
  }`
    ); // TODO : a changer
    this.execute = event.execute;

    client.send(
      JSON.stringify({
        state: 1,
        executeLink: this.buildListener.getExecuteLink(),
        compileLink: this.buildListener.getCompileLink(),
      })
    );
  }

  @SubscribeMessage('execute-request')
  async handle(client: any): Promise<void> {
    if (this.buildListener === null) {
      return;
    }
    const hasCompiled = await this.buildListener.build();

    client.send(JSON.stringify({ state: 2, hasCompiled }));

    if (hasCompiled && this.execute) {
      await this.buildListener.execute();
      client.send(JSON.stringify({ state: 3, hasExecuted: this.buildListener.isExecuted() }));
    }
    this.removeDocker();
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
      this.execute = false;
    }
  }
}
