import React, { useState } from 'react';
import { Box, Button, Tab, Badge } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import Editor from "@monaco-editor/react";
import { 
    MonacoLanguageClient, MonacoServices, 
    createConnection, CloseAction, ErrorAction 
} from '@codingame/monaco-languageclient';
import { listen, MessageConnection } from '@codingame/monaco-jsonrpc'
import { Console } from '@components';
import ReconnectingWebsocket from 'reconnecting-websocket';
import { webSocketLink } from '@services/WebSocket.client';

const ReconnectingWebSocket = require('reconnecting-websocket');

let ws : ReconnectingWebsocket | null = null;

interface IdeProperties {
    baseCode?: string;
}

const Ide = (props: IdeProperties) => {
    const consoleCompileRef = React.useRef<Console>(null);
    const consoleExecuteRef = React.useRef<Console>(null);

    const [code, setCode] = useState(props.baseCode);
    const [tab, setTab] = useState('1');
    const [compileDot, setCompileDot] = useState(0);
    const [executeDot, setExecuteDot] = useState(0);

    const handleTab = (event: any, value: string) => {
        if(value === '1'){
            setCompileDot(0);
        }
        if(value === '2'){
            setExecuteDot(0);
        }
        setTab(value);
    }

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
            debug: false
        };
        return new ReconnectingWebSocket(url, [], socketOptions);
    };

    const didMount = (monaco: any) => {
        ws = new ReconnectingWebSocket('ws://localhost:4100');
        MonacoServices.install(monaco, {rootUri: "file:///tmp/algoflex_autocomplete/"});
        const webSocket = createLanguageWebSocket(webSocketLink);
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
                    if(tab === '2'){
                        setCompileDot(1);
                    }
                }
                else if(state === 3){
                    const executeMessage = !result.hasExecuted && execute ? "Execution failed: timeout" : "";
                    consoleExecuteRef.current?.write(executeMessage);
                    if(tab === '1'){
                        setExecuteDot(1);
                    }
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
    <Box margin={3}>
        <Box border='3px #1e1e1e solid' bgcolor="#1e1e1e" boxShadow={3} mt={3} maxWidth={920} minWidth={200} borderRadius={2}>
            <Editor
                height="54vh"
                defaultLanguage="cpp"
                theme="vs-dark"
                value={code}
                onChange={value => setCode(String(value))}
                beforeMount={didMount}
                path='file:///tmp/algoflex_autocomplete/file.cpp'
            />
        </Box>
        <Box mt={1} mb={2}>
            <Box mr={1} display="inline">
                <Button variant="contained" color="primary" onClick={() => send(false)}> Compile </Button>
            </Box>
            <Box m={1} display="inline">
                <Button variant="contained" onClick={() => send(true)}> Compile and Run </Button>
            </Box>
        </Box>
        <Box width={920} border='5px #001e3c solid' bgcolor="#001e3c" borderRadius={2} >
        <TabContext value={tab}>
            <Box borderBottom={1} height="inherit" borderColor='divider' color={"white"}>
                <TabList onChange={handleTab} textColor="inherit">
                    <Tab label={<Badge badgeContent={compileDot} color="error" variant="dot">Compilation</Badge>} value="1" />
                    <Tab label={<Badge badgeContent={executeDot} color="error" variant="dot">Execution</Badge>} value="2" />
                </TabList>
            </Box>              
            <Console size={{col: 100, row: 12}} hidden={tab === '2'} ref={consoleCompileRef} options={{ theme: { background: "#001e3c", foreground: "white" },  }} />
            <Console size={{col: 100, row: 12}} hidden={tab === '1'} ref={consoleExecuteRef} options={{ theme: { background: "#001e3c", foreground: "white" } }} />
        </TabContext>
        </Box>
    </Box>
    );
}

export default Ide;
