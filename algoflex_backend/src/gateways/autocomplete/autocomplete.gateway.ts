import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import WebSocket from 'ws';
import rpc from '@sourcegraph/vscode-ws-jsonrpc';
import * as rpcServer from '@sourcegraph/vscode-ws-jsonrpc/lib/server';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3010)
export class AutoCompleteGateway implements OnGatewayDisconnect, OnGatewayConnection {
  private localConnection: rpcServer.IConnection;
  private logger: Logger = new Logger('AutocompleteGateway');

  handleConnection(client: any, ..._args: any[]) {
    this.logger.log(`WebSocket Client sucessfully connected`);
    const langServer = [
      'ccls',
      '--init={"cache": {"directory":"/tmp/algoflex_autocomplete","format":"json"},"index":{"onChange":true,"trackDependency":2}}',
    ];

    this.localConnection = rpcServer.createServerProcess('Autocomplete-Server', langServer[0], langServer.slice(1));
    const socket: rpc.IWebSocket = this.toSocket(client);
    const connection = rpcServer.createWebSocketConnection(socket);
    rpcServer.forward(connection, this.localConnection);
  }

  handleDisconnect(_client: any) {
    this.logger.log(`Disconnected`);
    this.localConnection.dispose();
  }

  private toSocket(webSocket: WebSocket): rpc.IWebSocket {
    return {
      send: (content: any) => webSocket.send(content),
      onMessage: (cb: any) =>
        (webSocket.onmessage = (event: any) => {
          // On converti le paramètre "code" en int pour éviter que le serveur de langage plante
          const result = JSON.parse(event.data.toString());
          if (result['method'] === 'textDocument/codeAction') {
            result['params']['context']['diagnostics'].forEach((value: any, index: any, array: any) => {
              array[index]['code'] = parseInt(value['code']);
            });
          }
          cb(JSON.stringify(result));
        }),
      onError: (cb) =>
        (webSocket.onerror = (event) => {
          if ('message' in event) {
            cb((event as any).message);
          }
        }),
      onClose: (cb) => (webSocket.onclose = (event) => cb(event.code, event.reason)),
      dispose: () => webSocket.close(),
    };
  }
}
