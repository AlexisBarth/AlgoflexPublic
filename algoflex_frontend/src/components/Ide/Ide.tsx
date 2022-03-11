import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Editor from "@monaco-editor/react";
import { 
    MonacoLanguageClient, MonacoServices,
    createConnection, CloseAction, ErrorAction
} from '@codingame/monaco-languageclient';
import { listen, MessageConnection } from '@codingame/monaco-jsonrpc'
import { Console } from '@components';
import ReconnectingWebsocket from 'reconnecting-websocket';

const ReconnectingWebSocket = require('reconnecting-websocket');

let ws : ReconnectingWebsocket | null = null;

interface IdeProperties {
    baseCode?: string;
}

const Ide = (props: IdeProperties) => {
    const consoleCompileRef = React.useRef<Console>(null);
    const consoleExecuteRef = React.useRef<Console>(null);

    const [code, setCode] = useState(props.baseCode);

    const createLanguageClient = (connection: MessageConnection): MonacoLanguageClient => {
        return new MonacoLanguageClient({
            name: "Cpp Language Client",
            clientOptions: {
                documentSelector: ['cpp'],
                errorHandler: {
                    error: () => ErrorAction.Continue,
                    closed: () => CloseAction.DoNotRestart
                }
            },
            connectionProvider: {
                get: (errorHandler, closeHandler) => {
                    return Promise.resolve(createConnection(connection, errorHandler, closeHandler))
                }
            }
        });
    };

    const createLanguageWebSocket = (url: string) : WebSocket => {
        const socketOptions = {
            maxReconnectionDelay: 10000,
            minReconnectionDelay: 1000,
            reconnectionDelayGrowFactor: 1.3,
            connectionTimeout: 10000,
            maxRetries: Infinity,
            debug: true,
        };
        return new ReconnectingWebSocket(url, [], socketOptions);
    };

    const didMount = (monaco: any) => {
        // ws = new ReconnectingWebSocket('ws://localhost:4100');
        ws = new ReconnectingWebSocket('ws://staging-algoflex.herokuapp.com');
        // const webSocket = createLanguageWebSocket("ws://localhost:4100/cpp");
        const webSocket = createLanguageWebSocket("ws://staging-algoflex.herokuapp.com");
        MonacoServices.install(monaco, {rootUri: "file:///app/autocomplete/"});
        listen({
            webSocket,
            onConnection: connection => {
                const languageClient = createLanguageClient(connection);
                const disposable = languageClient.start();
                connection.onClose(() => disposable.dispose());
            }
        });
    };

    const send = (execute : boolean) => {
        if(ws !== null && ws.readyState === ws.OPEN) {
            ws.onmessage = (event: MessageEvent) => {
                let result = JSON.parse(event.data);
                const state = result.state;
                if(state === 1){
                    const socketCompileTerminal = new WebSocket(result.compileLink);
                    const socketExecuteTerminal = new WebSocket(result.executeLink);
                    consoleCompileRef.current?.attachToConsole(socketCompileTerminal);
                    consoleExecuteRef.current?.attachToConsole(socketExecuteTerminal);
                    socketCompileTerminal.onopen = () => {
                        socketExecuteTerminal.onopen = () => {
                            ws?.send(JSON.stringify({event: 'execute-request'}));
                        };
                    };
                }
                else if(state === 2){
                    const buildMessage = result.hasCompiled ? "Build success" : "Build failed";
                    consoleCompileRef.current?.write(buildMessage);
                }
                else if(state === 3){
                    const executeMessage = !result.hasExecuted && execute ? "Execution failed: timeout" : "";
                    consoleExecuteRef.current?.write(executeMessage);
                }
            };

            const data = {
                event: 'compile-request',
                data: {
                    code,
                    execute,
                },
            };
            ws.send(JSON.stringify(data));
        }
    };

    return (
    <div className="editor">
        <Editor
            height="70vh"
            defaultLanguage="cpp"
            theme="vs-dark"
            value={code}
            onChange={value => setCode(String(value))}
            beforeMount={didMount}
            path='file:///app/autocomplete/file.cpp'
        />
        <Button variant="contained" color="primary" onClick={() => send(false)}> Compile </Button>
        <Box mr={1} display="inline">
            <Button variant="contained" onClick={() => send(true)}> Compile and Run </Button>
        </Box>
        <Box mr={1} display="inline">
            <Button variant="contained" color="secondary" > Configurator </Button>
        </Box>
        <Console ref={consoleCompileRef} />
        <Console ref={consoleExecuteRef} />
    </div>
    );
}

export default Ide;