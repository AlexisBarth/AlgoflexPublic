import * as WebSocket from 'ws';
import { BuildListener } from './listeners/build_listener';
import server from './httpServer';

const wss = new WebSocket.Server({server, path: '/ws'});

wss.on('connection', (ws: WebSocket) => {

    let buildListener: BuildListener | null = null;

    const removeDocker = () => {
        if(buildListener != null){
            buildListener.destroyDocker();
            buildListener = null;
        }
    }

    ws.on('message', async (data: string) => {
        if(buildListener == null){
            const buildData = JSON.parse(data);
            buildListener = await BuildListener.create(buildData.code);

            ws.send(JSON.stringify({state:1, executeId: buildListener.getExecuteId(), compileId: buildListener.getCompileId()}));
            const asCompiled = await buildListener.build();

            ws.send(JSON.stringify({state:2, asCompiled}))

            if(asCompiled && buildData.execute){
                await buildListener.execute(10000);
                ws.send(JSON.stringify({state:3, asExecuted: buildListener.isExecuted()}))
            }
            removeDocker();
        }
    });

    ws.on('close', () => {
        removeDocker();
    });
});

export default wss;