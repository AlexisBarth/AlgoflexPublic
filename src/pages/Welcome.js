import React, { useState, Fragment, useContext, useEffect, useRef } from 'react';
import { FirebaseContext } from '../components/Firebase';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';

const Welcome = props => {

    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);

    useEffect(() => {

        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.hystory.push('/')
        })

        return () => {
            listener()
        };
    }, [])

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p>Loading ...</p>
        </Fragment>
    ) : (
        <div className="Welcome">
            <Navigation />
            <Logo />
            <h1>Welcome</h1>
        </div>
    )
};

export default Welcome;