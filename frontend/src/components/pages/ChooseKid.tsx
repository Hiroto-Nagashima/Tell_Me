import React, { useEffect, useState } from 'react';
import { KidCard } from '../molecules/KidCard';
import axios from 'axios';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from '../atoms/Spinner';
import { Kid } from '../../types/api/kid';
import { useHistory } from 'react-router';

export const ChooseKid: React.FC = () => {
  console.log(4);
  const [kids, setKids] = useState<Array<Kid>>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parent] = useAuthState(getAuth());
  const history = useHistory();
  console.log(5);

  const onClickButton = (kid: Array<Kid>) => {
    history.push({
      pathname: '/',
      state: kid,
    });
  };
  console.log(6);
  const fetchKid = () =>
    axios
      .get('http://localhost:5000/api/v1/kids', {
        params: {
          uid: parent!.uid,
        },
      })
      .then((res) => {
        console.log(3);
        setKids(res.data);
        console.log(res);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  console.log(8);

  useEffect(() => {
    console.log(1);
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
            console.log(kid);

            return (
              <div key={kid.id}>
                <KidCard
                  kidName={kid.first_name}
                  age={kid.age}
                  onClick={() => onClickButton(Array(kid))}
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
