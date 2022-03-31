import { useState, useContext, ChangeEvent, FormEvent } from 'react';
import {useHistory } from 'react-router-dom';
import { FirebaseContext } from '@services/Firebase';
import {Button, Grid, Paper, Stack, TextField, Typography, Snackbar, Alert, Box, Avatar} from '@mui/material';
import Image from '../../../img/settings.png';

const UserSettings = () => {

    const history = useHistory();

    const firebase = useContext(FirebaseContext);
    const firebasePseudo = firebase.auth.currentUser?.displayName;
    const firebaseUser = firebase.auth.currentUser?.email;
    const imageUser =  firebase.auth.currentUser?.photoURL;

    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState<Error>();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [success, setSuccess] = useState<string>();

    const [email, setEmail] = useState(firebaseUser?.toString());
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [pseudo, setPseudo] = useState(firebasePseudo?.toString());
    const [photo, setPhoto] = useState(imageUser?.toString());

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email != null) {
            firebase.editEmailUser(email)
                .then(() => {
                    setOpenSuccess(true);
                    setSuccess("Votre profil a été mis à jour");
                })
                .catch(firebaseError => {
                    setError(firebaseError);
                    setOpenError(true);
                })
        }
        if (password != null) {
            firebase.editPasswordUser(password)
                .then(() => {
                    setOpenSuccess(true);
                    setSuccess("Votre profil a été mis à jour");
                })
                .catch(firebaseError => {
                    setError(firebaseError);
                    setOpenError(true);
                })
        }
        if ((photo != null) || (pseudo != null)) {
            firebase.addProfile(pseudo, photo)
                .then(() => {
                    setOpenSuccess(true);
                    setSuccess("Votre profil a été mis à jour");
                })
                .catch(firebaseError => {
                    setError(firebaseError);
                    setOpenError(true);
                })
        }
        setTimeout(() => {
            history.push('/')
        }, 5000)
    }

    const handleClose = () => {
        setOpenSuccess(false);
        setOpenError(false);
    };

    const addPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            const file = URL.createObjectURL(e.target.files[0]);
            setPhoto(file);
        }
    };

    return (
        <Box style={{display:'flex',
            justifyContent:'center',
            height:'98vh',
            backgroundImage:`url(${Image})`,
            backgroundSize:'cover',
            backgroundPosition:'bottom left'}}>
            <Paper style={{width:'100vh',
                height:'60vh',
                marginTop:'20vh',
                justifyContent:'center',
                display:'flex'}}>
                <Grid container
                      justifyContent='center'
                      alignItems='center'>
                    <Grid item xs={12} style={{display:'flex', justifyContent:'center'}}>
                        <Typography variant='h4' style={{color:'inherit', textDecoration: 'none'}}>
                            Modifier profil
                        </Typography>
                    </Grid>
                    <Grid item xs={6} direction='column'>
                        <Box style={{display:'flex', justifyContent:'center'}}>
                            <Avatar sx={{ width: 350, height: 350}} src={imageUser?.toString()}/>
                        </Box>
                        <Box style={{display:'flex', justifyContent:'center', marginTop:'2vh'}}>
                            <Typography variant='h4' style={{color: 'inherit', textDecoration: 'none'}}>
                                {firebasePseudo?.toString()}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} style={{display:'flex', justifyContent:'center'}}>
                        <Stack component='form' onSubmit={handleSubmit} gap={2} style = {{width: '30vh'}}>
                            <TextField
                                onChange={e => setPseudo(e.target.value)}
                                value={pseudo}
                                label={'Pseudo'}>
                            </TextField>
                            <TextField
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                label={'Email'}
                                type='email'>
                            </TextField>
                            <TextField
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                label={'Mot de passe'}
                                type='password'
                                inputProps={{minLength: 6 }}>
                            </TextField>
                            <TextField
                                onChange={e => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                label={'Confirmer le mot de passe'}
                                type='password'
                                inputProps={{minLength: 6 }}>
                            </TextField>
                            <Typography variant='h6' style={{color: 'inherit', textDecoration: 'none', marginTop:'1vh'}}>
                                Choisir une photo de profil :
                            </Typography>
                            <input type='file'
                                   id='photo' name='photo'
                                   accept='image/png, image/jpeg'
                                   onChange={addPhoto}/>
                            <Button type='submit' style={{ marginBottom:'2vh'}}>Confirmer</Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Snackbar
                    open={openError}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert severity='error'>{error?.message}</Alert>
                </Snackbar>
                <Snackbar
                    open={openSuccess}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert severity='success'>{success}</Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};


export default UserSettings;
