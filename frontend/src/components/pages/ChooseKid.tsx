import React, { useEffect, useState } from 'react';
import { KidCard } from '../molecules/KidCard';
import axios from 'axios';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from '../atoms/Spinner';
import { Kid } from '../../types/kid';
import { useHistory } from 'react-router';

export const ChooseKid: React.FC = () => {
  const [kids, setKids] = useState<Array<Kid>>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parent] = useAuthState(getAuth());
  const history = useHistory();

  const onClickButton = (kid: Array<Kid>) => {
    history.push({
      pathname: '/',
      state: kid,
    });
  };

  const fetchKid = () =>
    axios
      .get(`http://localhost:5000/api/v1/kids/index`, {
        params: {
          uid: parent!.uid,
        },
      })
      .then((res) => {
        setKids(res.data);
        console.log(res);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));

  useEffect(() => {
    console.log('Choose！！！！');
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
          <p>お子様を選択してください</p>
          {kids?.map((kid) => {
            <KidCard
              key={kid.id}
              kidName={kid.firstName}
              age={kid.age}
              onClick={() => onClickButton(Array(kid))}
            />;
          })}
        </>
      )}
    </>
  );
};
