import { Box } from '@material-ui/core';
import axios from 'axios';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Kid } from '../../types/api/kid';
import { Spinner } from '../atoms/Spinner/Spinner';
import { KidProfile } from '../organisms/KidProfile/KidProfile';
import { ParentProfile } from '../organisms/ParentProfile/ParentProfile';

export const Home: React.FC = () => {
  const [user] = useAuthState(firebase.auth());
  const [parent, setParent] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation<Array<Kid>>();
  const history = useHistory();

  if (!loading && !user) {
    history.push('/');
  }

  const fetchParent = () => console.log(2);
  axios
    .get(`http://localhost:5000/api/v1/parents/fetchParent`, {
      params: {
        uid: user!.uid,
      },
    })
    .then((res) => {
      console.log(3);
      setParent(res.data);
      console.log(res);
    })
    .catch((e) => setError(e))
    .finally(() => setLoading(false));

  useEffect(() => {
    console.log('aaaaaaaaaaaaaaa');
    fetchParent();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h1>エラーです</h1>
      ) : (
        <>
          <Box>
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
          </Box>
          <Box>
            {parent?.map((p) => {
              console.log(p);

              return (
                <div key={p.id}>
                  <ParentProfile
                    email={p.email}
                    telephoneNumber={p.telephone_number}
                    parentName={p.last_name}
                  />
                </div>
              );
            })}
          </Box>
        </>
      )}
    </>
  );
};
