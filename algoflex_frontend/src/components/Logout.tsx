import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../services/Firebase';

const Logout = () => {

    const firebase = useContext(FirebaseContext);

    const [checked, setChecked] = useState(false);

    console.log(checked);

    useEffect(() => {
        if (checked && firebase != null) {
            console.log("Déconnexion");
            firebase.signoutUser();
        }

    }, [checked, firebase]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    checked={checked}
                />
                <span className="slider round">Déconnexion</span>
            </label>
        </div>
    );
};

export default Logout