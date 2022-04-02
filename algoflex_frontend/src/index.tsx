import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Firebase, { FirebaseContext } from './services/Firebase';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
