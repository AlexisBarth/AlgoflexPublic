import Firebase from './Firebase';
import React from 'react';

const FirebaseContext = React.createContext<Firebase>(new Firebase());

export default Firebase;
export { FirebaseContext };