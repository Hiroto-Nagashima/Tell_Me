import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as H from 'history';
import axios from 'axios';
import { useHistory } from 'react-router';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CurrentUserContext } from '../../providers/UserProvider';

import { RegisterKidPaper } from '../organisms/RegisterKidPaper/RegisterKidPaper';
import { Spinner } from '../atoms';

type Props = {
  history: H.History;
};

export const RegisterKid: React.FC<Props> = () => {
  const history = useHistory();

  const [user] = useAuthState(getAuth());

  const { currentUser } = useContext(CurrentUserContext);

  const [age, setAge] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [gender, setGender] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState<string | null>('');
  const [firstName, setFirstName] = useState<string | null>('');
  const [daycareId, setDaycareId] = useState<number | null>(null);
  const [favoriteFood, setFavoriteFood] = useState<string | null>('');
  const [favoritePlay, setFavoritePlay] = useState<string | null>('');

  const onChangeFirstName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setFirstName(e.target.value);
  }, []);

  const onChangeLastName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setLastName(e.target.value);
  }, []);

  const onChangeAge = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setAge(value);
  }, []);

  const onChangeDaycareId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setDaycareId(value);
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

  const onClickRegister = () => {
    setLoading(true);
    axios
      .post(`http://localhost:5000/api/v1/kids`, {
        params: {
          age: age,
          first_name: firstName,
          last_name: lastName,
          gender: gender,
          daycare_id: daycareId,
          favorite_food: favoriteFood,
          favorite_play: favoritePlay,
          uid: user!.uid,
        },
      })
      .then((res) => {
        history.push({
          pathname: `/kids/${res.data.kid.id}`,
          state: res.data.kid,
        });
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <RegisterKidPaper
            age={age}
            parentLastName={currentUser.lastName}
            parentFirstName={currentUser.firstName}
            gender={gender}
            lastName={lastName}
            daycareId={daycareId}
            firstName={firstName}
            favoriteFood={favoriteFood}
            favoritePlay={favoritePlay}
            onClickRegister={onClickRegister}
            onChangeAge={onChangeAge}
            onChangeDaycareId={onChangeDaycareId}
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
