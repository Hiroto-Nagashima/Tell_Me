import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CurrentKidContext } from '../providers/KidProvider';

export const useFetchUser = () => {
  const { currentKid, setCurrentKid } = useContext(CurrentKidContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState(0);
  const [kidLastName, setKidLastName] = useState<string>('');
  const [kidFirstName, setKidFirstName] = useState<string>('');
  const [favoriteFood, setFavoriteFood] = useState<string>('');
  const [favoritePlay, setFavoritePlay] = useState<string>('');

  const getKid = () => {
    setLoading(true);
    console.log('hogehoge');
    axios
      .get(`http://localhost:5000/api/v1/kids/${id}`)
      .then((res) => {
        setCurrentKid(res.data.kid);
        setAge(res.data.kid.age);
        setGender(res.data.kid.gender);
        setKidLastName(res.data.kid.lastName);
        setKidFirstName(res.data.kid.firstName);
        setFavoriteFood(res.data.kid.favoriteFood);
        setFavoritePlay(res.data.kid.favoritePlay);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  return {
    error,
    loading,
    currentKid,
    age,
    gender,
    kidLastName,
    kidFirstName,
    favoriteFood,
    favoritePlay,
    getKid,
    setCurrentKid,
    setAge,
    setError,
    setLoading,
    setGender,
    setKidLastName,
    setKidFirstName,
    setFavoriteFood,
    setFavoritePlay,
  };
};
