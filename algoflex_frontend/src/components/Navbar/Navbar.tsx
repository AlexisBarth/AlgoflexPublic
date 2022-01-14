import { Link} from 'react-router-dom';
import IsAuthenticated from '@services/Authentication.utils';
import {Toolbar, Typography, AppBar, ThemeProvider, createTheme} from '@mui/material'
import UserMenu from "./UserMenu";

const Navbar = () => {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const AuthContent = () => {
        if (IsAuthenticated()){
            return (<>
                <Typography variant="h6" component={Link} to='editeur'
                            style={{color: 'inherit', textDecoration: 'none', margin:'1vh'}}>
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
                <Typography variant="h6" component={Link} to='login' style={{ color: 'inherit', textDecoration: 'none', margin:'1vh' }}>
                    Log in
                </Typography>
            </>);
    }

    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar position="fixed">
            <Toolbar className="navigation">
                <div style={{display:'flex', flexGrow:1}}>
                    <Typography variant="h6" component={Link} to='/' style={{ color: 'inherit', textDecoration: 'none', margin:'1vh' }}>
                        Accueil
                    </Typography>
                    <Typography variant="h6" component={Link} to='about' style={{ color: 'inherit', textDecoration: 'none', margin:'1vh' }}>
                        À propos
                    </Typography>
                    <AuthContent/>
                </div>
                <AuthCheck/>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    );
};

export default Navbar;