import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from '../atoms/Spinner/Spinner';
import { KidCard } from '../molecules/KidCard/KidCard';
import axios from 'axios';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Kid } from '../../types/api/kid';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../providers/UserProvider';

export const ChooseKid: React.FC = () => {
  console.log(4);
  const [kids, setKids] = useState<Array<Kid>>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(getAuth());
  const history = useHistory();
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  const onClickButton = (kidId: number) => {
    history.push(`/kids/${kidId}`);
  };
  console.log(6);
  const fetchKid = () =>
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
          console.log(res);
        }
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
