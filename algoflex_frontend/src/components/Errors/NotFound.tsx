import {Typography, Grid} from "@mui/material";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";

const NotFound = () => {

    const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push('/')
        }, 4000)
    })

    return (
        <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center">
            <Typography variant="h2" style={{color: 'inherit', textDecoration: 'none', marginTop:"8vh"}}>
                Erreur 404
            </Typography>
            <Typography variant="h5" style={{color: 'inherit', textDecoration: 'none'}}>
                Vous allez être redirigé
            </Typography>
        </Grid>
    );
};

export default NotFound;