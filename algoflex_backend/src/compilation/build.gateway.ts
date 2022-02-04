import {
    //ConnectedSocket,
    //MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    //SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
// import { Socket } from "socket.io";
import { Server } from 'http';
import { BuildListener } from './build_listener';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class BuildGateway implements OnGatewayDisconnect, OnGatewayConnection{

    @WebSocketServer()
    server: Server;
    private buildListener: BuildListener | null = null;
    private logger: Logger = new Logger('BuildGateway');

    @SubscribeMessage("message")
    handleMessage(_client: WebSocket, _data: string) {
        this.logger.log(`Message received`);
        /*if(this.buildListener == null){
            const buildData = JSON.parse(data);
            this.buildListener = BuildListener.create(buildData.code, ""); // TODO : a changer
            
            client.send(JSON.stringify({state:1, executeLink: this.buildListener.getExecuteLink(), compileLink: this.buildListener.getCompileLink()}));
            const hasCompiled = await this.buildListener.build();

            client.send(JSON.stringify({state:2, hasCompiled}))

            if(hasCompiled && buildData.execute){
                await this.buildListener.execute();
                client.send(JSON.stringify({state:3, hasExecuted: this.buildListener.isExecuted()}))
            }
            this.removeDocker();
        }*/
    }

    handleDisconnect(_client: WebSocket) {
        this.logger.log(`Disconnected`);
        this.removeDocker();
    }

    handleConnection(client: WebSocket, ..._args: any[]) {
        this.logger.log(`Client connected: ${client}`);
    }

    private removeDocker(){
        if(this.buildListener != null){
            this.buildListener.destroyDocker();
            this.buildListener = null;
        }
    }
}