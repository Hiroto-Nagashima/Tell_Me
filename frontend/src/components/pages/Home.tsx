// import { Box } from '@material-ui/core';
import axios from 'axios';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { Kid } from '../../types/api/kid';
import { Parent } from '../../types/api/parent';
import { Spinner } from '../atoms/Spinner/Spinner';
import { KidProfile, ParentProfile } from '../organisms/index';

export const Home: React.FC = () => {
  const [user] = useAuthState(firebase.auth());
  const [parent, setParent] = useState<Parent | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation<Array<Kid>>();

  const fetchParent = async () =>
    await axios
      .get(`http://localhost:5000/api/v1/parents/fetchParentArray`, {
        params: {
          uid: user!.uid,
        },
      })
      .then((res) => {
        console.log(3);
        setParent(res.data);
        console.log(parent);
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
          {state?.map((kid) => (
            <div key={kid.id}>
              <KidProfile
                age={kid.age}
                kidName={kid.last_name}
                favoriteFood={kid.favorite_food}
                favoritePlay={kid.favorite_play}
              />
            </div>
          ))}
          <div key={parent?.id}>
            <ParentProfile
              email={parent?.email}
              telephoneNumber={parent?.telephone_number}
              parentName={parent?.last_name}
            />
          </div>
        </>
      )}
    </>
  );
};
