import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { MonacoLanguageClient,MonacoServices, createConnection } from '@codingame/monaco-languageclient';
import { listen, MessageConnection } from '@codingame/monaco-jsonrpc'
import AlgoSocket from '../services/algosocket';
import { Box, Button } from '@material-ui/core';
import Console from './console';
import { v4 as uuidv4 } from "uuid"
import './ide.css';

const ws = new AlgoSocket('ws://localhost:4100/ws');
const autocompleteId = uuidv4();

interface IdeProperties {
    baseCode?: string;
}

const Ide = (props: IdeProperties) => {
    const consoleCompileRef = React.useRef<Console>(null);
    const consoleExecuteRef = React.useRef<Console>(null);

    const [code, setCode] = useState("");

    const createLanguageClient = (connection: MessageConnection): MonacoLanguageClient => {
        return new MonacoLanguageClient({
            name: "Cpp Language Client",
            clientOptions: {
                documentSelector: ['cpp'],
            },
            connectionProvider: {
                get: (errorHandler, closeHandler) => {
                    return Promise.resolve(createConnection(connection, errorHandler, closeHandler))
                }
            }
        });
    }

    const didMount = (monaco: any) => {
        MonacoServices.install(monaco, {rootUri: "file:///tmp/algoflex_autocomplete/"});
        const webSocket = new WebSocket("ws://localhost:3010/cpp");
        listen({
            webSocket,
            onConnection: connection => {
                const languageClient = createLanguageClient(connection);
                const disposable = languageClient.start();
                connection.onClose(() => disposable.dispose());
            }
        });
    }

    const send = (execute : boolean) => {
        if(ws.socket.readyState === ws.socket.OPEN){
            ws.socket.onmessage = (event: MessageEvent) => {
                let result = JSON.parse(event.data);
                const state = result.state;
                if(state === 1){
                    const socketCompileTerminal = new WebSocket(result.compileLink);
                    const socketExecuteTerminal = new WebSocket(result.executeLink);
                    consoleCompileRef.current?.attachToConsole(socketCompileTerminal);
                    consoleExecuteRef.current?.attachToConsole(socketExecuteTerminal);
                }
                else if(state === 2){
                    const buildMessage = result.hasCompiled ? "Build success" : "Build failed";
                    consoleCompileRef.current?.write(buildMessage);
                }
                else if(state === 3){
                    const executeMessage = !result.hasExecuted && execute ? "Execution failed: timeout" : "";
                    consoleExecuteRef.current?.write(executeMessage);
                }
                else{
                    console.error("Error: undefined state");
                }
            };

            var data = {code : code, execute: execute};

            ws.socket.send(JSON.stringify(data)); 
        }
    }

    return (
    <div className="editor">
           <Editor
            height="70vh"
            defaultLanguage="cpp"
            theme="vs-dark"
            value={code}
            onChange={code => setCode(String(code))}
            beforeMount={didMount}
            path={`file:///tmp/algoflex_autocomplete/file_${autocompleteId}.cpp`}
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