import React from 'react';
import { auth } from '../../firebase';

export const Home: React.FC = () => {
  return (
    <>
      <div>Homeです</div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </>
  );
};
