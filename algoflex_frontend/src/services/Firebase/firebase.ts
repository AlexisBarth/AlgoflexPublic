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
    }

    // inscription
    signupUser = (email: string, password: string) => 
    this.auth.createUserWithEmailAndPassword(email, password);

    // connexion
    loginUser = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

    // deconnexion
    signoutUser = () => this.auth.signOut();

    // récupérer le mot de passe
    passwordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
}

export default Firebase;