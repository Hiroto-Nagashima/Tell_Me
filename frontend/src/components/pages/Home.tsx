import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { Box } from '@material-ui/core';
import { Kid } from '../../types/api/kid';
import { Spinner } from '../atoms/Spinner/Spinner';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CurrentUserContext } from '../../providers/UserProvider';
import { KidProfile, UpdateKidModal, ParentProfile } from '../organisms/index';

export const Home: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [parent] = useAuthState(getAuth());

  const { currentUser } = useContext(CurrentUserContext);

  const [age, setAge] = useState<number | null>(null);
  const [kid, setKid] = useState<Kid | null>(null);
  const [error, setError] = useState(false);
  const [gender, setGender] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState<string | null>('');
  const [firstName, setFirstName] = useState<string | null>('');
  const [favoriteFood, setFavoriteFood] = useState<string | null>('');
  const [favoritePlay, setFavoritePlay] = useState<string | null>('');
  const [kidUpdateOpen, setKidUpdateOpen] = useState(false);

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
  const handleUpdateKidSubmit = useCallback(() => {
    axios
      .post(`http://localhost:5000/api/v1/kids`, {
        params: {
          age: age,
          first_name: firstName,
          last_name: lastName,
          gender: gender,
          favorite_food: favoriteFood,
          favorite_play: favoritePlay,
          uid: parent!.uid,
        },
      })
      .then((res) => {
        console.log(res.data.kid);
      })
      .catch((e) => console.log(e));
  }, []);

  const onCloseUpdateKid = useCallback(() => {
    setKidUpdateOpen(false);
  }, []);

  const onClickUpdateKid = useCallback(() => {
    setKidUpdateOpen(true);
  }, []);

  const fetchKid = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/api/v1/kids/${id}`)
      .then((res) => {
        setKid(res.data);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchKid();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <Box display="flex" justifyContent="space-around">
            <KidProfile
              age={kid?.age}
              kidId={id}
              src="image.jpeg"
              gender={kid?.gender}
              firstName={kid?.first_name}
              lastName={kid?.last_name}
              favoriteFood={kid?.favorite_food}
              favoritePlay={kid?.favorite_play}
              onClick={onClickUpdateKid}
            />
            <div key={currentUser?.id}>
              <ParentProfile
                email={currentUser?.email}
                gender={currentUser?.gender}
                telephoneNumber={currentUser.telephoneNumber}
                firstName={currentUser.firstName}
                lastName={currentUser.lastName}
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
