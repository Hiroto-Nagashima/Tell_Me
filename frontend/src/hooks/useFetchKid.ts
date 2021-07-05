import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CurrentKidContext } from '../providers/KidProvider';

export const useFetchKid = () => {
  const { currentKid, setCurrentKid } = useContext(CurrentKidContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState(0);
  const [kidLastName, setKidLastName] = useState<string>('');
  const [kidFirstName, setKidFirstName] = useState<string>('');
  const [favoriteFood, setFavoriteFood] = useState<string>('');
  const [favoritePlay, setFavoritePlay] = useState<string>('');

  const getKid = () => {
    setLoading(true);
    axios
      .get(`${API_ENDPOINT}kids/${id}`)
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
    age,
    error,
    gender,
    loading,
    currentKid,
    kidLastName,
    kidFirstName,
    favoriteFood,
    favoritePlay,
    getKid,
    setAge,
    setError,
    setGender,
    setLoading,
    setCurrentKid,
    setKidLastName,
    setKidFirstName,
    setFavoriteFood,
    setFavoritePlay,
  };
};
