import { useState, Fragment, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../services/Firebase';
import firebase from "firebase/app";
import Navigation from '../Navigation';
import Logout from '../Logout';
import history from '../../services/history'
type User = firebase.User;

const Welcome = () => {

    const Firebase = useContext(FirebaseContext)

    const [userSession, setUserSession] = useState<User>();

    useEffect(() => {

        let listener = Firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : history.push('/')
        })

        return () => {
            listener()
        };
    }, [Firebase.auth])

    return userSession == null ? (
        <Fragment>
            <div className="loader"></div>
            <p>Loading ...</p>
        </Fragment>        
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Navigation />
                <Logout />
            </div>
        </div>
    )
};

export default Welcome;