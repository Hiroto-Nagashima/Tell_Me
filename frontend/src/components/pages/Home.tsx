import firebase from 'firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
// import { useLocation } from 'react-router-dom';
// import { Kid } from '../../types/api/kid';
import { Spinner } from '../atoms/Spinner';

const logout = () => {
  firebase.auth().signOut();
};

export const Home: React.FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  // const { state } = useLocation<Array<Kid>>();
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
      {/* {state.map((kid) => ( */}
      <>
        <div>Homeです </div>
        <button onClick={() => logout()}></button>
      </>
      {/* ))} */}
    </>
  );
};
