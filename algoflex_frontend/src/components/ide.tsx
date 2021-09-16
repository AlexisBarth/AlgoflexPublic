import React, { useState } from 'react';
import AceEditor from 'react-ace';
import './ide.css';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import { Box, Button } from '@material-ui/core';
import axios from 'axios';
import Console from './console';

interface IdeProperties {
    baseCode?: string;
}

const Ide = (props: IdeProperties) => {

    const consoleRef = React.useRef<Console>(null);

    const [code, setCode] = useState("");

    const sendToCompile = () => {
        axios.post('http://localhost:4100/api/build', {
            code: code,
            execute: false
        }).then((response) => {
            const socketCompile = new WebSocket("ws://localhost:2376/containers/" + response.data['compileId'] + "/attach/ws?logs=1&stream=1&stdin=1&stdout=1&stderr=1");
            consoleRef.current?.attachToConsole(socketCompile);
            axios.post('http://localhost:4100/api/run', {
                compileId: response.data['compileId'],
                executeId: response.data['executeId'],
                volumeId: response.data['volumeId'],
                asCompiled: response.data['asCompiled']
            });
        });
    };

    const sendToCompileAndRun = () => {
        axios.post('http://localhost:4100/api/build', {
            code: code,
            execute: true
        }).then((response) => {
            let socket;
            if(response.data['asCompiled']){
                socket = new WebSocket("ws://localhost:2376/containers/" + response.data['executeId'] + "/attach/ws?logs=1&stream=1&stdin=1&stdout=1&stderr=1");
            }
            else{
                socket = new WebSocket("ws://localhost:2376/containers/" + response.data['compileId'] + "/attach/ws?logs=1&stream=1&stdin=1&stdout=1&stderr=1");
            }
            consoleRef.current?.attachToConsole(socket);
            axios.post('http://localhost:4100/api/run', {
                compileId: response.data['compileId'],
                executeId: response.data['executeId'],
                volumeId: response.data['volumeId'],
                asCompiled: response.data['asCompiled']
            });
        });
    };

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
        <Button variant="contained" color="primary" onClick={sendToCompile}> Compile </Button>
        <Box mr={1} display="inline">   
        <Button variant="contained" onClick={sendToCompileAndRun}> Compile and Run </Button>
        </Box>
        <Box mr={1} display="inline">   
        <Button variant="contained" color="secondary" > Configurator </Button>
        </Box>
        <Console ref={consoleRef} />
    </div>
    );
}

export default Ide;