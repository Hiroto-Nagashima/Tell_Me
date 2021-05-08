import firebase from 'firebase';
import React from 'react';

// import { logout } from '../../helper/FirebaseAuthHelper';
const logout = () => {
  firebase.auth().signOut();
};

export const Home: React.FC = () => {
  return (
    <>
      <div>Homeです </div>
      <button onClick={() => logout()}>Sign out</button>
    </>
  );
};
