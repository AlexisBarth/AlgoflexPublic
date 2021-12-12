import { useContext } from 'react'
import { FirebaseContext } from '@services/Firebase';
import {Button, Typography} from '@mui/material';
import {Link} from "react-router-dom";

const Logout = () => {

    const firebase = useContext(FirebaseContext);

    const logout = () => {
        if (firebase != null) {
            console.log("Déconnexion");
            firebase.signoutUser();
        }
    };

    return (
        <Typography variant="h6" component={Button} onClick={logout} style={{ color: 'inherit', textDecoration: 'none', margin: 15 }}>
            Logout
        </Typography>
    );
};

export default Logout