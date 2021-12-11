import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA29TC3w3ppTdQNmvRigb_L8rZb8bFOseY",
    authDomain: "algoflex-dce55.firebaseapp.com",
    projectId: "algoflex-dce55",
    storageBucket: "algoflex-dce55.appspot.com",
    messagingSenderId: "625231792435",
    appId: "1:625231792435:web:f5aab51deafd46c8e09646"
};

class Firebase {

    public auth;

    constructor() {
        if(!firebase.apps.length){
            firebase.initializeApp(config);
        }
        else{
            firebase.app();
        }
        this.auth = firebase.auth();
        this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    }

    // inscription
    signupUser = async (email: string, password: string) => {
        const { user } = await this.auth.createUserWithEmailAndPassword(email, password);
        const token = await user?.getIdToken(true);
        if (token === undefined) {
            return;
        }
    }

    // connexion
    loginUser = async (email: string, password: string) => {
        const { user } = await this.auth.signInWithEmailAndPassword(email, password);
        const token = await user?.getIdToken(true);
        if (token === undefined) {
            return;
        }
    }

    // deconnexion
    signoutUser = () => {
        //deleteCookie('token');
        this.auth.signOut();
    };

    // récupérer le mot de passe
    passwordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
}

export default Firebase;
