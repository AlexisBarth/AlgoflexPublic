import React, { useState, Fragment, useContext, useEffect } from 'react';
import { FirebaseContext } from '../components/Firebase';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import Logout from '../components/Logout';

const Welcome = props => {

    const Firebase = useContext(FirebaseContext)

    const [userSession, setUserSession] = useState(null);

    useEffect(() => {

        let listener = Firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })

        return () => {
            listener()
        };
    }, [])

    return userSession == null ? (
        <Fragment>
            <div className="loader"></div>
            <p>Loading ...</p>
        </Fragment>        
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Navigation />
                <Logo />
                <Logout />
            </div>
        </div>
    )
};

export default Welcome;