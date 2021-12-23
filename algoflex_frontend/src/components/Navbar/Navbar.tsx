import { Link } from 'react-router-dom';
import IsAuthenticated from '@services/Authentication.utils';
import {Toolbar, Typography} from '@mui/material'
import UserMenu from "./UserMenu";

const Navbar = () => {
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
            return (<>
                <UserMenu/>
            </>);
        }
        return(<>
            <Typography variant="h6" component={Link} to='login' style={{ color: 'inherit', textDecoration: 'none', margin: 15 }}>
                Log in
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
                    À propos
                </Typography>
                <AuthContent/>
            </div>
            <AuthCheck/>
        </Toolbar>
    );
};

export default Navbar;