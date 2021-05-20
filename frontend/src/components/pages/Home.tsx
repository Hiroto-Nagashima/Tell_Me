import { Box } from '@material-ui/core';
import axios from 'axios';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { Kid } from '../../types/api/kid';
import { User } from '../../types/api/user';
import { Spinner } from '../atoms/Spinner/Spinner';
import { KidProfile, ParentProfile } from '../organisms/index';

export const Home: React.FC = () => {
  const [parent] = useAuthState(firebase.auth());
  const [user, setUser] = useState<User | null>(null);
  const [kid, setKid] = useState<Kid | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const fetchUser = async () =>
    await axios
      .get(`http://localhost:5000/api/v1/users/fetchUser`, {
        params: {
          uid: parent!.uid,
        },
      })
      .then((res) => {
        setUser(res.data);
        console.log(user);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));

  const fetchKid = async () =>
    await axios
      .get(`http://localhost:5000/api/v1/kids/${id}`)
      .then((res) => {
        setKid(res.data);
        console.log(kid);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));

  useEffect(() => {
    console.log('aaaaaaaaaaaaaaa');
    fetchUser();
    fetchKid();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h1>エラーです</h1>
      ) : (
        <Box display="flex" justifyContent="space-around">
          <KidProfile
            age={kid?.age}
            gender={kid?.gender}
            firstName={kid?.first_name}
            lastName={kid?.last_name}
            favoriteFood={kid?.favorite_food}
            favoritePlay={kid?.favorite_play}
          />
          <div key={user?.id}>
            <ParentProfile
              email={user?.email}
              gender={user?.gender}
              telephoneNumber={user?.telephone_number}
              firstName={user?.first_name}
              lastName={user?.last_name}
            />
          </div>
        </Box>
      )}
    </>
  );
};
