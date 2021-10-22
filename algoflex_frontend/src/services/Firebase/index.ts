import Firebase from './firebase';
import React from 'react';

const FirebaseContext = React.createContext<Firebase>(new Firebase());

export default Firebase;
export { FirebaseContext };