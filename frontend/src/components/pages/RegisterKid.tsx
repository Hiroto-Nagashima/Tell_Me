import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import * as H from 'history';
import { useHistory } from 'react-router';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from '../atoms/Spinner/Spinner';
import { RegisterKidPaper } from '../organisms/RegisterKidPaper/RegisterKidPaper';

type Props = {
  history: H.History;
};

export const RegisterKid: React.FC<Props> = () => {
  console.log(4);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState(0);
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [daycareID, setDaycareId] = useState<number | null>(null);
  const [favoriteFood, setFavoriteFood] = useState<string | null>('');
  const [favoritePlay, setFavoritePlay] = useState<string | null>('');
  const [user] = useAuthState(getAuth());

  const history = useHistory();

  const onChangeAge = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setAge(value);
  }, []);

  const onChangeDaycareID = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setDaycareId(value);
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
  console.log(5);
  const handleSubmit = () => {
    axios
      .post(`http://localhost:5000/api/v1/kids`, {
        params: {
          age: age,
          first_name: firstName,
          last_name: lastName,
          gender: gender,
          daycare_id: daycareID,
          favorite_food: favoriteFood,
          favorite_play: favoritePlay,
          uid: user!.uid,
        },
      })
      .then((res) => {
        history.push({ pathname: '/', state: res.data.kid });
        console.log(res.data.kid);
      })
      .catch((e) => console.log(e));
  };

  const fetchUser = () => console.log(2);
  axios
    .get(`http://localhost:5000/api/v1/users/fetchUserName`, {
      params: {
        uid: user!.uid,
      },
    })
    .then((res) => {
      console.log(3);
      setUserName(res.data);
      console.log(res);
    })
    .catch((e) => setError(e))
    .finally(() => setLoading(false));

  useEffect(() => {
    console.log('aaaaaaaaaaaaaaa');
    fetchUser();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h1>エラー</h1>
      ) : (
        <>
          <RegisterKidPaper
            age={age}
            userName={userName}
            daycareID={daycareID}
            firstName={firstName}
            lastName={lastName}
            gender={gender}
            favoriteFood={favoriteFood}
            favoritePlay={favoritePlay}
            onClick={handleSubmit}
            onChangeAge={onChangeAge}
            onChangeDaycareID={onChangeDaycareID}
            onChangeFirstName={onChangeFirstName}
            onChangeLastName={onChangeLastName}
            onChangeGender={onChangeGender}
            onChangeFavoriteFood={onChangeFavoriteFood}
            onChangeFavoritePlay={onChangeFavoritePlay}
          />
        </>
      )}
    </>
  );
};
