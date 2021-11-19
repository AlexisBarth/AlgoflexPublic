import { useState, useEffect, useContext, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../services/Firebase';
import history from '../../services/history';

const Login = () => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setBtn(true)
        } else if (btn) {
            setBtn(false)
        }
    }, [password, email, btn])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        firebase.loginUser(email, password)
        .then(user => {
            setEmail('');
            setPassword('');
            history.push('/welcome');
        })
        .catch(error => {
            setError(error);
            setEmail('');
            setPassword('');   
        })
    }

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                    {error != null && <span>{error.message}</span>}

                    <h2>Connexion</h2>
                    <form onSubmit={handleSubmit}>                            

                        <div className="inputBox">
                            <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                            <label htmlFor="Email">Email</label>
                        </div>

                        <div className="inputBox">
                            <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete="off" required />
                            <label htmlFor="password">Mot de passe</label>
                        </div>

                        {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}

                    </form>
                    <div className="linkContainer">
                        <Link className="simpleLink" to="/signup">Nouveau sur Algoflex ? Inscrivez-vous.</Link>
                        <br />
                        <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié ?</Link>
                    </div>
                    </div>
                </div>
            </div>        
        </div>
    );
};

export default Login;