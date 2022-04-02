import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

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
        if (process.env.NODE_ENV === "test") {
            this.auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
        } else {
            this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        }

    }

    //upload image to storage
    uploadImage = async (file: File) => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        await storageRef.child(file.name).put(file);
        return storageRef.child(file.name).getDownloadURL()
    }

    // inscription
    signupUser = async (email: string, password: string, username: string, photo?: File) => {
        const { user } = await this.auth.createUserWithEmailAndPassword(email, password)
            .then((acc) => {
                this.addProfile(username, photo)
                return acc;
        });
        const token = await user?.getIdToken(true);
        if (token === undefined) {
            return;
        }
        localStorage.setItem('token', token);
    }

    // connexion
    loginUser = async (email: string, password: string) => {
        const { user } = await this.auth.signInWithEmailAndPassword(email, password);
        const token = await user?.getIdToken(true);
        if (token === undefined) {
            return;
        }
        localStorage.setItem('token', token);
    }

    // deconnexion
    signoutUser = () => {
        localStorage.removeItem('token');
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
    addProfile = async (name='', photo?: File) => {
        if (photo) {
            const url = await this.uploadImage(photo);
            console.log("URL", url);
            await this.auth.currentUser?.updateProfile({displayName: name, photoURL: url});
        }
    }

    // récupérer le mot de passe
    passwordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
}

export default Firebase;
