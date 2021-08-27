import React, { useState } from 'react';
import AceEditor from 'react-ace';
import './ide.css';
import Console from '../console/console'
import axios from 'axios'
import { Button, Box } from '@material-ui/core'

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';


export default function Ide() {

    const [code, setCode] = useState('//Your code belongs to us')
    
    const consoleRef: React.RefObject<Console> = React.useRef(null);

    function changeLanguages() {
        console.log("Change Langage");
    };

    function sendToCompile() {
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

    function sendToCompileAndRun() {
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
            axios.post('http://localhost:4100/api/run', {
                compileId: response.data['compileId'],
                executeId: response.data['executeId'],
                volumeId: response.data['volumeId'],
                asCompiled: response.data['asCompiled']
            });
            consoleRef.current?.attachToConsole(socket);
        });
    };

    function accesConfig() {
        console.log("Accès Config");  
    };

    return(
         <body>
            <div className="linear-gradient">A L G O F L E X </div>
            <div className="control-panel">
                Select Language:
                &nbsp; &nbsp;
                <select id="languages" className="languages" onChange={changeLanguages}>
                    <option value="c"> C </option>
                    <option value="cpp"> C++ </option>
                    <option value="python"> Python </option>
                </select>
            </div>
            <div className="editor" id="editor"></div>
            <AceEditor
                style={{

                    height: '50vh',
                    width: '100%',
                }}
                placeholder='Start Coding'
                theme='monokai'
                mode="c_cpp"
                name='basic-code-editor'
                onChange={currentCode => setCode(currentCode)}
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
            <Box m={1}>
            <Box mr={1} display="inline">     
            <Button variant="contained" color="primary" onClick={sendToCompile}> Compile </Button>
            </Box>
            <Box mr={1} display="inline">   
            <Button variant="contained" onClick={sendToCompileAndRun}> Compile and Run </Button>
            </Box>
            <Box mr={1} display="inline">   
            <Button variant="contained" color="secondary" onClick={accesConfig}> Configurator </Button>
            </Box>
            </Box>
            <div className="col">
            <p> Console d'exécution : </p>
            <Console ref={consoleRef} />
            </div>
            <script src="./langage.js"></script>
        </body>
    )
}