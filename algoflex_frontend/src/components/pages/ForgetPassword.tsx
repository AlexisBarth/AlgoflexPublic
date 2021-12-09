import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../services/Firebase';
import history from '../../services/history'

const ForgetPassword = () => {

    const firebase = useContext(FirebaseContext);
    
    const [email, setEmail] = useState<string>("");
    const [succes, setSucces] = useState<string>("");
    const [error, setError] = useState<Error>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
        event.preventDefault();
        firebase.passwordReset(email)
        .then(() => {
            setError(undefined);
            setSucces(`Consultez votre email ${email} pour changer le mot de passe`)
            setEmail("");

            setTimeout(() => {
                history.push('/login')
            }, 5000)
        })
        .catch(error => {
            setError(error);
            setEmail("");
        })
    }

    const disabled = email === "";

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        { 
                            succes && <span 
                                style={{
                                border: "1px solide green",
                                background: "green",
                                color: "#ffffff"
                            }}
                            >
                                {succes}
                            </span> 
                        }

                        {error && <span>{error.message}</span>}

                        <h2>Mot de passe oublié ?</h2>
                        <form onSubmit={handleSubmit}>                            

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="Email">Email</label>
                            </div>

                            <button disabled={disabled}>Récupérer</button>

                        </form>

                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit ? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default ForgetPassword