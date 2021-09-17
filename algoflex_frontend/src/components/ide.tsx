import React, { useState } from 'react';
import AceEditor from 'react-ace';
import ws from '../services/socket';
import './ide.css';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import { Box, Button } from '@material-ui/core';
import Console from './console';

interface IdeProperties {
    baseCode?: string;
}

const Ide = (props: IdeProperties) => {

    const consoleCompileRef = React.useRef<Console>(null);
    const consoleExecuteRef = React.useRef<Console>(null);

    const [code, setCode] = useState("");

    const send = (execute : boolean) => {
        if(ws.readyState === ws.OPEN){
            ws.onmessage = (event: MessageEvent) => {
                let result = JSON.parse(event.data);
                const state = result.state;
                if(state === 1){
                    const socketCompileTerminal = new WebSocket("ws://localhost:2376/containers/" + result.compileId + "/attach/ws?logs=1&stream=1&stdin=1&stdout=1&stderr=1");
                    const socketExecuteTerminal = new WebSocket("ws://localhost:2376/containers/" + result.executeId + "/attach/ws?logs=1&stream=1&stdin=1&stdout=1&stderr=1");
                    consoleCompileRef.current?.attachToConsole(socketCompileTerminal);
                    consoleExecuteRef.current?.attachToConsole(socketExecuteTerminal);
                }
                else if(state === 2){
                    const buildMessage = result.asCompiled ? "Build success" : "Build failed";
                    consoleCompileRef.current?.write(buildMessage);
                }
                else if(state === 3){
                    const executeMessage = !result.asExecuted && execute ? "Execution failed: timeout" : "";
                    consoleExecuteRef.current?.write(executeMessage);
                }
                else{
                    console.error("Error: undefined state");
                }
            };

            ws.onerror = (event: Event) => {
                console.error("Server error");
            };

            var data = {code : code, execute: execute};

            ws.send(JSON.stringify(data)); 
        }
    }

    return (
    <div className="editor">
        <AceEditor
            style={{
                height: '50vh',
                width: '100%',
            }}
            placeholder='Start Coding'
            theme='monokai'
            mode="c_cpp"
            name='basic-code-editor'
            onChange={code => setCode(code)}
            fontSize={18}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
            }}
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