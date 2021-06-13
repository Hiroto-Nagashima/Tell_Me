import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as H from 'history';
import axios from 'axios';
import { useHistory } from 'react-router';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CurrentUserContext } from '../../providers/UserProvider';

import { RegisterKidPaper } from '../organisms/RegisterKidPaper/RegisterKidPaper';
import { CustomizedSnackbar, Spinner } from '../atoms';

type Props = {
  history: H.History;
};

export const RegisterKid: React.FC<Props> = () => {
  const history = useHistory();

  const [user] = useAuthState(getAuth());

  const { currentUser } = useContext(CurrentUserContext);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [age, setAge] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
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

  const onCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

    return;
  };

  const onClickRegister = () => {
    setLoading(true);
    axios
      .post(`${API_ENDPOINT}kids`, {
        params: {
          age: age,
          gender: gender,
          first_name: firstName,
          last_name: lastName,
          daycare_id: daycareId,
          favorite_food: favoriteFood,
          favorite_play: favoritePlay,
          uid: user!.uid,
        },
      })
      .then((res) => {
        if (res.data.status == '422') {
          setError(res.data.message);
          setOpen(true);
        } else {
          history.push({
            pathname: `/kids/${res.data.kid.id}`,
            state: res.data.kid,
          });
        }
      })
      .catch((e) => {
        setError(e);
        setOpen(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <RegisterKidPaper
            age={age}
            error={error}
            gender={gender}
            lastName={lastName}
            daycareId={daycareId}
            firstName={firstName}
            favoriteFood={favoriteFood}
            favoritePlay={favoritePlay}
            isSnackbarOpen={open}
            parentLastName={currentUser.lastName}
            parentFirstName={currentUser.firstName}
            onChangeAge={onChangeAge}
            onChangeGender={onChangeGender}
            onCloseSnackbar={onCloseSnackbar}
            onClickRegister={onClickRegister}
            onChangeDaycareId={onChangeDaycareId}
            onChangeFirstName={onChangeFirstName}
            onChangeLastName={onChangeLastName}
            onChangeFavoriteFood={onChangeFavoriteFood}
            onChangeFavoritePlay={onChangeFavoritePlay}
          />
          <CustomizedSnackbar
            open={open}
            onClose={onCloseSnackbar}
            severity="error"
          >
            {error}
          </CustomizedSnackbar>
        </>
      )}
    </>
  );
};
