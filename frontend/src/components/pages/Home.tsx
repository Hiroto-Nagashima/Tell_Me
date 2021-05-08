import firebase from 'firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { Spinner } from '../atoms/Spinner';

// import { logout } from '../../helper/FirebaseAuthHelper';
const logout = () => {
  firebase.auth().signOut();
};

export const Home: React.FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const history = useHistory();
  if (loading) {
    return <Spinner color="primary" />;
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (!loading && !user) {
    history.push('/');
  }

  return (
    <>
      <div>Homeです </div>
      <button onClick={() => logout()}>Sign out</button>
    </>
  );
};
