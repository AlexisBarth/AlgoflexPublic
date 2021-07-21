import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                    <h2>Connexion</h2>
                    <form>                            

                        <div className="inputBox">
                            <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                            <label htmlFor="Email">Email</label>
                        </div>

                        <div className="inputBox">
                            <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                            <label htmlFor="password">Mot de passe</label>
                        </div>

                    </form>
                    <div className="linkContainer">
                        <Link className="simpleLink" to="/signup">Nouveau sur Algoflex ? Inscrivez-vous.</Link>
                    </div>
                    </div>
                </div>
            </div>        
        </div>
    );
};

export default Login;