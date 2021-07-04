import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Kid } from '../../types/api/kid';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../providers/UserProvider';

import { Box, Grid } from '@material-ui/core';
import { Spinner, StyledButton } from '../atoms';
import { KidCard } from '../organisms/KidCard/KidCard';

const ButtonArea = styled(Grid)`
  margin-top: 50px;
`;

const Direction = styled.h2`
  margin: 50px 0;
`;

const KidCardArea = styled(Grid)`
  margin-top: 50px;
`;

const MyLink = styled(Link)`
  text-decoration: none;
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
          <KidCardArea container justify="center" alignItems="center">
            <Grid item md={4} sm={6} xs={10}>
              <Direction>お子様を選択してください</Direction>
              {kids?.map((kid) => {
                return (
                  <Box key={kid.id} my={5}>
                    <KidCard
                      kidName={kid.first_name}
                      age={kid.age}
                      src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/kid/image/${kid.id}/image.jpeg`}
                      onClick={() => onClickButton(kid.id)}
                    />
                  </Box>
                );
              })}
            </Grid>
          </KidCardArea>
          <ButtonArea container justify="flex-end">
            <Grid item md={3} sm={6} xs={10}>
              <MyLink to="/kids/register">
                <StyledButton
                  label="新しい子供を登録"
                  fontSize={18}
                  width={70}
                  borderRadius={20}
                />
              </MyLink>
            </Grid>
          </ButtonArea>
        </>
      )}
    </>
  );
};
