import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from '@services/Firebase';

const IsAuthenticated = () => {

    const firebase = useContext(FirebaseContext);

    const [logged, setLogged] = useState<Boolean>(false);

    useEffect(() => {
        const listener = firebase.auth.onAuthStateChanged(user => {
            user ? setLogged(true) : setLogged(false);
        });

        return () => {
            listener()
        };
    }, [firebase.auth])

    return logged;
}

export default IsAuthenticated;