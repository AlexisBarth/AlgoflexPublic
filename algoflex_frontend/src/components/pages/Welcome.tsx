import React, { useState, Fragment, useContext, useEffect } from 'react';
import { FirebaseContext } from '../services/Firebase';
import firebase from "firebase/app";
import Logo from '../Logo';
import Navigation from '../Navigation';
import Logout from '../Logout';
import { WelcomeProps } from '../interfaces';
type User = firebase.User;

const Welcome = (props: WelcomeProps) => {

    const Firebase = useContext(FirebaseContext)

    const [userSession, setUserSession] = useState<User>();

    useEffect(() => {

        let listener = Firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })

        return () => {
            listener()
        };
    }, [Firebase.auth, props.history])

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