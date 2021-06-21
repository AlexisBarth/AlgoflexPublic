import {useState} from 'react'
import AceEditor from 'react-ace'
import './ide.css'


import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
// import { render } from '@testing-library/react'



function Ide() {
    const [code, setCode] = useState(`//Your code belongs to us`)

    return (
            <body>
                <div className="linear-gradient">A L G O F L E X </div>
                <div className="control-panel">
                    Select Language:
                    &nbsp; &nbsp;
                    <select id="languages" class="languages" onchange={changeLanguage}>
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
                    <div classeName="inner">
                        <button className="btn1" onClick={sendToCompile()}> Compile </button>
                        <button className="btn2" onClick={sendToCompileAndRun()}> Compile and Run </button>
                        <button className="btn3" onClick={accesConfig()}> Configurator </button>
                    </div>
                </div>
                
                <div className="button-container">
                    <button className="btn" onClick={sendToCompile()}> Compile </button>
                </div>
                <div className="button-container">
                    <button className="btn" onClick={sendToCompileAndRun()}> Compile and Run </button>
                </div>
                <div className="button-container">
                    <button className="btn" onClick={accesConfig()}> Configurator </button>
                </div>



                <div className="output"></div>
                <script src="./langage.js"></script>

            </body>
    )
}


/*
*TODO: A mettre dans un autre fichier
*Linker les value du select au lib de langage
*
*
*/

function changeLanguage() {
    console.log("Change Langage")  
}
function sendToCompile() {
    console.log("Compile")  
}
function sendToCompileAndRun() {
    console.log("Compile and Run")  
}
function accesConfig() {
    console.log("Accès Config")  
}


export default Ide