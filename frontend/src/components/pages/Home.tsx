import { Box } from '@material-ui/core';
import axios from 'axios';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { Kid } from '../../types/api/kid';
import { Parent } from '../../types/api/parent';
import { Spinner } from '../atoms/Spinner/Spinner';
import { KidProfile, ParentProfile } from '../organisms/index';
import { UpdateKidModal } from '../organisms/UpdateKidModal';

export const Home: React.FC = () => {
  const [user] = useAuthState(firebase.auth());
  const [parent, setParent] = useState<Parent | null>(null);
  const [kid, setKid] = useState<Kid | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [kidUpdateOpen, setKidUpdateOpen] = useState(false);

  const onCloseUpdateKid = () => {
    setKidUpdateOpen(false);
  };

  const onClickUpdateKid = () => {
    setKidUpdateOpen(true);
  };

  const fetchParent = async () =>
    await axios
      .get(`http://localhost:5000/api/v1/parents/fetchParentArray`, {
        params: {
          uid: user!.uid,
        },
      })
      .then((res) => {
        setParent(res.data);
        console.log(parent);
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
    fetchParent();
    fetchKid();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h1>エラーです</h1>
      ) : (
        <>
          <Box display="flex" justifyContent="space-around">
            <KidProfile
              age={kid?.age}
              gender={kid?.gender}
              firstName={kid?.first_name}
              lastName={kid?.last_name}
              favoriteFood={kid?.favorite_food}
              favoritePlay={kid?.favorite_play}
              onClick={onClickUpdateKid}
            />
            <div key={parent?.id}>
              <ParentProfile
                email={parent?.email}
                gender={parent?.gender}
                telephoneNumber={parent?.telephone_number}
                firstName={parent?.first_name}
                lastName={parent?.last_name}
              />
            </div>
          </Box>
          <UpdateKidModal isOpen={kidUpdateOpen} onClose={onCloseUpdateKid} />
        </>
      )}
    </>
  );
};
