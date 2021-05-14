import firebase from 'firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Kid } from '../../types/api/kid';
import { Spinner } from '../atoms/Spinner/Spinner';
import { KidProfile } from '../organisms/KidProfile/KidProfile';

export const Home: React.FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const { state } = useLocation<Array<Kid>>();
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
      {loading ? (
        <Spinner />
      ) : error ? (
        <h1>エラーです</h1>
      ) : (
        <>
          <p>Home</p>
          {state?.map((kid) => {
            console.log(kid);

            return (
              <div key={kid.id}>
                <KidProfile
                  age={kid.age}
                  kidName={kid.last_name}
                  favoriteFood={kid.favorite_food}
                  favoritePlay={kid.favorite_play}
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
