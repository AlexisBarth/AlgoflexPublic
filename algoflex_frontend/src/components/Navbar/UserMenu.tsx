import * as React from "react";
import {Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Button, Typography} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {FirebaseContext} from "@services/Firebase";

export default function UserMenu() {
    const firebase = useContext(FirebaseContext);
    const firebasePseudo = firebase.auth.currentUser?.displayName;
    const firebaseUser = firebase.auth.currentUser?.email;
    const imageUser =  firebase.auth.currentUser?.photoURL;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        if (firebase != null) {
            firebase.signoutUser();
        }
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h6" style={{color: 'inherit', textDecoration: 'none', margin:'1vh'}}>
                    {firebasePseudo?.toString()}
                </Typography>
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar sx={{ width: 32, height: 32 }} src={imageUser?.toString()}>{firebaseUser != null ? firebaseUser[0] : ""}</Avatar>
                </IconButton>
            </Box>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem component={Link} to='/userSettings' style={{ color: 'inherit', textDecoration: 'none'}}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem component={Button} onClick={logout} style={{ color: 'inherit', textDecoration: 'none', textTransform: 'none'}}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    </React.Fragment>
);
}