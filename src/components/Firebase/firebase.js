import app from 'firebase/app';
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
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    // inscription
    signupUser = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

    // connexion
    loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    // deconnexion
    signoutUser = () => this.auth.signOut()
}

export default Firebase;