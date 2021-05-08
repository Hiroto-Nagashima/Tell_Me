import firebase from 'firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { logout } from '../../helper/FirebaseAuthHelper';
const logout = () => {
  firebase.auth().signOut();
};

export const Home: React.FC = () => {
  const [user] = useAuthState(firebase.auth());

  return (
    <>
      <div>Homeです {user!.email}</div>
      <button onClick={() => logout()}>Sign out</button>
    </>
  );
};
