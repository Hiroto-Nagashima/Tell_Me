import { Box } from '@material-ui/core';
import axios from 'axios';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { Kid } from '../../types/api/kid';
import { Parent } from '../../types/api/parent';
import { Spinner } from '../atoms/Spinner/Spinner';
import { KidProfile, ParentProfile } from '../organisms/index';
import { UpdateKidModal } from '../organisms/UpdateKidModal';

export const Home: React.FC = () => {
  const [parent, setParent] = useState<Parent | null>(null);
  const [kid, setKid] = useState<Kid | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [kidUpdateOpen, setKidUpdateOpen] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState(0);
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [favoriteFood, setFavoriteFood] = useState<string | null>('');
  const [favoritePlay, setFavoritePlay] = useState<string | null>('');
  const [user] = useAuthState(getAuth());

  const onChangeAge = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setAge(value);
  }, []);

  const onChangeFirstName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setFirstName(e.target.value);
  }, []);

  const onChangeLastName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setLastName(e.target.value);
  }, []);

  const onChangeGender = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setGender(value);
  }, []);

  const onChangeFavoriteFood = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setFavoriteFood(e.target.value);
    },
    [],
  );
  const onChangeFavoritePlay = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setFavoritePlay(e.target.value);
    },
    [],
  );
  const handleUpdateKidSubmit = () => {
    axios
      .post(`http://localhost:5000/api/v1/kids`, {
        params: {
          age: age,
          first_name: firstName,
          last_name: lastName,
          gender: gender,
          favorite_food: favoriteFood,
          favorite_play: favoritePlay,
          uid: user!.uid,
        },
      })
      .then((res) => {
        // history.push({ pathname: '/', state: res.data.kid });
        console.log(res.data.kid);
      })
      .catch((e) => console.log(e));
  };

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
          <UpdateKidModal
            isOpen={kidUpdateOpen}
            onClose={onCloseUpdateKid}
            age={age}
            gender={gender}
            firstName={firstName}
            lastName={lastName}
            favoriteFood={favoriteFood}
            favoritePlay={favoritePlay}
            onChangeAge={onChangeAge}
            onChangeGender={onChangeGender}
            onChangeFirstName={onChangeFirstName}
            onChangeLastName={onChangeLastName}
            onChangeFavoriteFood={onChangeFavoriteFood}
            onChangeFavoritePlay={onChangeFavoritePlay}
            onSubmit={handleUpdateKidSubmit}
          />
        </>
      )}
    </>
  );
};
