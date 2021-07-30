import React, { useState } from 'react';
import AceEditor from 'react-ace';
import './ide.css';
import { socket, ss } from "../../service/socket";

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';


export default function Ide() {

    const [code, setCode] = useState('//Your code belongs to us')

    const [response, setResponse] = useState("");

    function changeLanguages() {
        console.log("Change Langage");
    };

    function sendToCompile() {
        console.log("Compile"); 
    };

    function sendToCompileAndRun() {
        ss(socket).on('console', (stream : any) => {
            var binaryString = "";

            stream.on('data', (data : any) => {
                for(var i = 0; i < data.length; i++) {
                    binaryString += String.fromCharCode(data[i]);
                }
                setResponse(binaryString);            
            });
        });

        socket.emit('build', code);
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
            <div id="outer">
                <div className="inner">
                    <button className="btn1" onClick={sendToCompile}> Compile </button>
                    <button className="btn2" onClick={sendToCompileAndRun}> Compile and Run </button>
                    <button className="btn3" onClick={accesConfig}> Configurator </button>
                </div>
            </div>
            <p> Console : </p>
            <div className="output"> 
                {response}
            </div>
            <script src="./langage.js"></script>

        </body>
    )
}