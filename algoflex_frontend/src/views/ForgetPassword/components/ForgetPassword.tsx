import React, {useState, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FirebaseContext } from '@services/Firebase';
import Image from "../../../img/login.jpg";
import {Alert, Box, Button, Grid, Paper, Snackbar, Stack, TextField, Typography} from "@mui/material";

const ForgetPassword = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const [email, setEmail] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const [error, setError] = useState<Error>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
        event.preventDefault();
        firebase.passwordReset(email)
        .then(() => {
            setError(undefined);
            setOpenSuccess(true);
            setSuccess(`Consultez votre email ${email} pour changer de mot de passe`)
            setEmail("");

            setTimeout(() => {
                history.push('/login')
            }, 5000)
        })
        .catch(firebaseError => {
            setError(firebaseError);
            setOpenError(true);
            setEmail("");
        })
    }

    const handleClose = () => {
        setOpenError(false);
        setOpenSuccess(false);
    };

    return (

        <Box style={{display:"flex", justifyContent:"center", height:"98vh", backgroundImage:`url(${Image})`, backgroundSize:"cover", backgroundPosition: "bottom left"}}>
            <Paper style={{width:"50vh", height:"50vh", marginTop:"20vh", justifyContent:"center", display:"flex"}}>
                <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center">
                    <Typography variant="h4" style={{color: 'inherit', textDecoration: 'none', margin:"2vh"}}>
                        Mot de passe oublié
                    </Typography>
                    <Stack component="form" onSubmit={handleSubmit} gap={2} data-testid="form" >
                        <TextField
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            label={"Email"}
                            type="email"
                            data-testid="email">
                        </TextField>
                        <Button type="submit" style={{ marginBottom:"2vh"}}>Récupérer mot de passe</Button>
                    </Stack>
                    <Typography variant="caption" component={Link} to='/login'
                                style={{color: 'inherit', textDecoration: 'none'}}>
                        Déjà inscrit ? Connectez-vous
                    </Typography>
                </Grid>
                <Snackbar
                    open={openError}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert severity="error">{error?.message}</Alert>
                </Snackbar>
                <Snackbar
                    open={openSuccess}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert severity="success">{success}</Alert>
                </Snackbar>
            </Paper>
        </Box>
    )
}

export default ForgetPassword