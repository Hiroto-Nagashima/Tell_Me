import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Kid } from '../../types/api/kid';
import { Spinner } from '../atoms/Spinner/Spinner';
import { KidCard } from '../molecules/KidCard/KidCard';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';

export const ChooseKid: React.FC = () => {
  const history = useHistory();

  const [user] = useAuthState(getAuth());

  const [kids, setKids] = useState<Array<Kid>>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickButton = (kidId: number) => {
    history.push(`/kids/${kidId}`);
  };

  const fetchKid = () => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/v1/kids', {
        params: {
          uid: user!.uid,
        },
      })
      .then((res) => {
        if (res.data.message === '子供が未登録です') {
          history.push('/kids/register');
        } else {
          setKids(res.data);
        }
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
        <h1>エラーです</h1>
      ) : (
        <>
          <p>お子様を選択してください</p>
          {kids?.map((kid) => {
            return (
              <div key={kid.id}>
                <KidCard
                  kidName={kid.first_name}
                  age={kid.age}
                  onClick={() => onClickButton(kid.id)}
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
