import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../../services/Firebase';
import {Button, Grid, Paper, Stack, TextField, Typography, Snackbar, Alert, Box} from "@mui/material";
import Image from "../../../img/login.jpg";

const Signup = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const [error, setError] = useState<Error>()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [photo, setPhoto] = useState<File>();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(email && password && pseudo) {
            firebase.signupUser(email, password, pseudo, photo)
                .then(() => {
                    history.push('/');
                })
                .catch(firebaseError => {
                    setError(firebaseError);
                    setOpen(true);
                })
        }

    }
    const handleClose = () => {
        setOpen(false);
    };

    const addPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            setPhoto(e.target.files[0]);
        }
    };


    return (
        <Box style={{display:"flex", justifyContent:"center", height:"98vh", backgroundImage:`url(${Image})`, backgroundSize:"cover", backgroundPosition:"bottom left"}}>
        <Paper style={{width:"50vh", height:"60vh", marginTop:"20vh", justifyContent:"center", display:"flex"}}>
            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center">
                <Typography variant="h4" style={{color: 'inherit', textDecoration: 'none', margin:"2vh"}}>
                    Signup
                </Typography>
                <Stack component="form" onSubmit={handleSubmit} gap={2} data-testid="signup-form">
                    <TextField
                        onChange={e => setPseudo(e.target.value)}
                        value={pseudo}
                        label={"Pseudo"}
                        inputProps={{"data-testid":"signup-pseudo"}}>
                    </TextField>
                    <TextField
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        label={"Email"}
                        type="email"
                        inputProps={{"data-testid":"signup-email"}}>
                    </TextField>
                    <TextField
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        label={"Mot de passe"}
                        type="password"
                        inputProps={{"data-testid":"signup-password", minLength: 6 }}>
                    </TextField>
                    <TextField
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        label={"Confirmer le mot de passe"}
                        type="password"
                        inputProps={{"data-testid":"signup-confirm-password", minLength: 6 }}>
                    </TextField>
                    <input type='file'
                           id='photo' name='photo'
                           accept='image/png, image/jpeg'
                           onChange={addPhoto}/>
                    <Button type="submit" style={{ marginBottom:"2vh"}} data-testid={"signup-submit"}>Créer compte</Button>
                </Stack>
                <Typography variant="caption" component={Link} to='/login'
                            style={{color: 'inherit', textDecoration: 'none'}}>
                    Déjà inscrit ? Connectez-vous
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

export default Signup;