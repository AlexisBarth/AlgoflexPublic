import { deleteCookie, setCookie } from '@services/Cookie.utils';
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
        this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }

    // inscription
    signupUser = async (email: string, password: string, username: string, photo = '') => {
        const { user } = await this.auth.createUserWithEmailAndPassword(email, password)
            .then((acc) => {
                this.addProfile(username, photo)
                return acc;
        });
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
        setCookie('token', token);
    }

    // deconnexion
    signoutUser = () => {
        deleteCookie('token');
        this.auth.signOut();
    };

   //edit mail
    editEmailUser = async (email: string) => {
        await this.auth.currentUser?.updateEmail(email);
    }

    // edit Password
    editPasswordUser = async (email: string) => {
        await this.auth.currentUser?.updatePassword(email);
    }

    //add pseudo and profile pick
    addProfile = async (name='', photo='') => {
        await this.auth.currentUser?.updateProfile({displayName: name, photoURL: photo});
    }

    // récupérer le mot de passe
    passwordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
}

export default Firebase;
