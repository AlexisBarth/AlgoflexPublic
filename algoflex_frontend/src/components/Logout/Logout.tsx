import { useContext } from 'react'
import { FirebaseContext } from '@services/Firebase';
import {Button, Typography} from '@mui/material';
import * as React from "react";

const Logout = () => {

    const firebase = useContext(FirebaseContext);

    const logout = () => {
        if (firebase != null) {
            console.log("Déconnexion");
            firebase.signoutUser();
        }
    };

    return (
        <Typography component={Button} onClick={logout} style={{ color: 'inherit', textDecoration: 'none'}}>
            Logout
        </Typography>
    );
};

export default Logout