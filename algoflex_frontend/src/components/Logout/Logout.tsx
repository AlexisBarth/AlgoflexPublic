import { useContext } from 'react'
import { FirebaseContext } from '@services/Firebase';
import { Button } from '@mui/material';

const Logout = () => {

    const firebase = useContext(FirebaseContext);

    const logout = () => {
        if (firebase != null) {
            console.log("Déconnexion");
            firebase.signoutUser();
        }
    };

    return (
        <Button onClick={logout}>
            Logout
        </Button>
    );
};

export default Logout