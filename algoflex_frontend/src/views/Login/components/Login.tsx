import { useState, useEffect, useContext, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../../services/Firebase';
import {Button, Grid, TextField, Typography, Stack, Paper, Alert, Snackbar, Box} from '@mui/material';
import Image from '../../../img/login.jpg';

const Login = () => {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setBtn(true)
        } else if (btn) {
            setBtn(false)
        }
    }, [password, email, btn])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        firebase.loginUser(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                history.push('/');
            })
            .catch(firebaseError => {
                setError(firebaseError);
                setOpen(true);
                setEmail('');
                setPassword('');
            })
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box style={{display:"flex", justifyContent:"center", height:"98vh", backgroundImage:`url(${Image})`, backgroundSize:"cover", backgroundPosition: "bottom left"}}>
            <Paper style={{width:"50vh", height:"50vh", marginTop:"20vh", justifyContent:"center", display:"flex"}}>
                <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center">
                    <Typography variant="h4" style={{color: 'inherit', textDecoration: 'none', margin:"2vh"}}>
                        Login
                    </Typography>
                    <Stack component="form" onSubmit={handleSubmit} gap={2} data-testid="login-form">
                        <TextField
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            label={"Email"}
                            type="email"
                            inputProps={{"data-testid":"login-email"}}>
                        </TextField>
                        <TextField
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            label={"Mot de passe"}
                            type="password"
                            inputProps={{"data-testid":"login-password", minLength: 6 }}>
                        </TextField>
                        <Button type="submit" style={{ marginBottom:"2vh"}} data-testid="login-submit">Connexion</Button>
                    </Stack>
                    <Typography variant="caption" component={Link} to='/signup'
                                style={{color: 'inherit', textDecoration: 'none'}}>
                        Nouveau sur Algoflex ? Inscrivez-vous
                    </Typography>
                    <Typography variant="caption" component={Link} to='/forgetpassword'
                                style={{color: 'inherit', textDecoration: 'none'}}>
                        Mot de passe oublié ?
                    </Typography>
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert severity="error">{error?.message}</Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default Login;