import React, { useState } from 'react';
import { Box, Button, Tab, Badge, Grid } from '@mui/material';
import { PlayArrow, Check } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import Editor from "@monaco-editor/react";
import { 
    MonacoLanguageClient, MonacoServices,
    createConnection, CloseAction, ErrorAction
} from '@codingame/monaco-languageclient';
import { listen, MessageConnection } from '@codingame/monaco-jsonrpc'
import { Console, Markdown } from '@components';
import ReconnectingWebsocket from 'reconnecting-websocket';
import { webSocketLink } from '@services/WebSocket.client';
import { CodingQuestionInterface } from '@components/interfaces';

const ReconnectingWebSocket = require('reconnecting-websocket');

let ws : ReconnectingWebsocket | null = null;

const Ide = (props: CodingQuestionInterface) => {
    const consoleCompileRef = React.useRef<Console>(null);
    const consoleExecuteRef = React.useRef<Console>(null);

    const [code, setCode] = useState(props.prompt);
    const [tab, setTab] = useState('1');
    const [compileDot, setCompileDot] = useState(0);
    const [executeDot, setExecuteDot] = useState(0);

    const markdown = `
# ${props.name}  
${props.description}`;

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
            debug: true,
        };
        return new ReconnectingWebSocket(url, [], socketOptions);
    };

    const didMount = (monaco: any) => {
        ws = new ReconnectingWebSocket(webSocketLink);
        MonacoServices.install(monaco, {rootUri: "file:///app/autocomplete/"});
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

    const send = (execute : boolean, questionId: string | undefined) => {
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
                    questionId
                },
            };
            ws.send(JSON.stringify(data));
        }
    };

    return (
    <Grid container columnSpacing={2} mt={3} alignItems="stretch">
        <Grid item height={"100%"} xs={12} md={7} order={{ xs:2, md:1}}>
            <Box border='3px #1e1e1e solid' bgcolor="#1e1e1e" boxShadow={3} borderRadius={1}>
                <Editor
                    height="55vh"
                    defaultLanguage="cpp"
                    theme="vs-dark"
                    value={code}
                    onChange={value => setCode(String(value))}
                    beforeMount={didMount}
                    path='file:///app/autocomplete/file.cpp'
                />
            </Box>
            <Box mt={1} mb={2}>
                <Box mr={1} display="inline">
                    <Button startIcon={<Check />} variant="contained" color="primary" onClick={() => send(false, props.uid)}> Compile </Button>
                </Box>
                <Box m={1} display="inline">
                    <Button startIcon={<PlayArrow />} variant="contained" onClick={() => send(true, props.uid)}> Compile and Run </Button>
                </Box>
            </Box>
            <Box border='5px #001e3c solid' bgcolor="#001e3c" borderRadius={1} boxShadow={3} >
                <TabContext value={tab}>
                    <Box borderBottom={1} height="inherit" borderColor='divider' color={"white"} >
                        <TabList onChange={handleTab} textColor="inherit">
                            <Tab label={<Badge badgeContent={compileDot} color="error" variant="dot">Compilation</Badge>} value="1" />
                            <Tab label={<Badge badgeContent={executeDot} color="error" variant="dot">Execution</Badge>} value="2" />
                        </TabList>
                    </Box>
                    <Console height={12} hidden={tab === '2'} ref={consoleCompileRef} options={{ theme: { background: "#001e3c", foreground: "white" },  }} />
                    <Console height={12} hidden={tab === '1'} ref={consoleExecuteRef} options={{ theme: { background: "#001e3c", foreground: "white" } }} />
                </TabContext>
            </Box>
        </Grid>
        <Grid item height={"100%"} xs={12} md={5} mb={{xs:2, md:0}} order={{ xs:1, md:2}}>
            <Box height="88vh" border='1px gray solid' overflow={'auto'} p={2} bgcolor="white" boxShadow={3} borderRadius={1} >
                <Markdown text={markdown} />
            </Box>
        </Grid>
    </Grid>
    );
}

export default Ide;