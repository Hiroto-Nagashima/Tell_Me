import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Kid } from '../../types/api/kid';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../providers/UserProvider';

import { Box } from '@material-ui/core';
import { Spinner } from '../atoms/Spinner/Spinner';
import { KidCard } from '../molecules/KidCard/KidCard';

const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Direction = styled.h2`
  margin: 50px 0;
`;

export const ChooseKid: React.FC = () => {
  const history = useHistory();
  const { currentUser } = useContext(CurrentUserContext);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [kids, setKids] = useState<Array<Kid>>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickButton = (kidId: number) => {
    history.push(`/kids/${kidId}`);
  };

  const fetchKids = () => {
    setLoading(true);
    axios
      .get(`${API_ENDPOINT}users/${currentUser.id}/kids`)
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
    currentUser && fetchKids();
  }, [currentUser]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <Wrapper>
            <Box>
              <Direction>お子様を選択してください</Direction>
              {kids?.map((kid) => {
                return (
                  <div key={kid.id}>
                    <KidCard
                      kidName={kid.first_name}
                      age={kid.age}
                      src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/kid/image/${kid.id}/image.jpeg`}
                      onClick={() => onClickButton(kid.id)}
                    />
                  </div>
                );
              })}
            </Box>
          </Wrapper>
        </>
      )}
    </>
  );
};
