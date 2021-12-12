import { Link } from 'react-router-dom';
import { Logout } from '@components';
import IsAuthenticated from '@services/Authentication.utils';
import {Toolbar, Typography, Divider} from '@mui/material'
import {useContext} from "react";
import {FirebaseContext} from "@services/Firebase";

const Navbar = () => {
    const firebase = useContext(FirebaseContext);

    const AuthContent = () => {
        if (IsAuthenticated()){
            return (<>
                <Typography variant="h6" component={Link} to='editeur'
                            style={{color: 'inherit', textDecoration: 'none', margin: 15}}>
                    Editeur
                </Typography>
            </>);
        }
        return (<></>)
    }

    const AuthCheck = () => {
        if(IsAuthenticated()){
            //TODO : change link to --> user page
            //TODO : ask that firebase auth save username, not only email
            return (<>
                <Typography variant="h6" component={Link} to='about' style={{ color: 'inherit', textDecoration: 'none', margin: 15 }}>
                    {firebase.auth.currentUser?.email}
                </Typography>
                <Typography variant="h6" component={Logout} style={{ color: 'inherit', textDecoration: 'none', margin: 15 }}>
                    Logout
                </Typography>
            </>);
        }
        return(<>
            <Typography variant="h6" component={Link} to='login' style={{ color: 'inherit', textDecoration: 'none', margin: 15 }}>
                Log in
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem style={{ background: 'black', width: "2.5px"}}/>
            <Typography variant="h6" component={Link} to='login' style={{ color: 'inherit', textDecoration: 'none', margin: 15 }}>
                Sign up
            </Typography>
            </>);
    }

    return (
        <Toolbar className="navigation" style={{ display: 'flex' }}>
            <div style={{display:'flex', flexGrow:1}}>
                <Typography variant="h6" component={Link} to='/' style={{ color: 'inherit', textDecoration: 'none', margin: 15 }}>
                    Accueil
                </Typography>
                <Typography variant="h6" component={Link} to='about' style={{ color: 'inherit', textDecoration: 'none', margin: 15 }}>
                    A propos
                </Typography>
                <AuthContent/>
            </div>
            <AuthCheck/>
        </Toolbar>
    );
};

export default Navbar;