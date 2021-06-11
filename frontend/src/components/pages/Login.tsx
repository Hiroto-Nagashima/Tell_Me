import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as H from 'history';
import axios from 'axios';
import styled from 'styled-components';
import firebase from 'firebase';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../providers/UserProvider';

import { Box, Typography } from '@material-ui/core';
import { LoginPaper } from '../organisms/LoginPaper/LoginPaper';
import { Spinner, CustomizedSnackbar } from '../atoms';
import { ReactComponent as Logo } from '../../images/undraw_Notebook_re_id0r.svg';

type Props = {
  history: H.History;
};
const Body = styled(Box)`
  height: 800px;
  padding: 4%;
  background-color: white;
`;

const HomeImage = styled(Logo)`
  width: 800px;
`;

const MyLoginPaper = styled(LoginPaper)`
  margin: 60px;
`;

const Wrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 13% 5% 5% 5%;
  height: 65vh;
`;

export const Login: React.FC<Props> = () => {
  const history = useHistory();

  const { setCurrentUser } = useContext(CurrentUserContext);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  }, []);

  const onCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

    return;
  };

  const tryLogin = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        const user = getAuth().currentUser;
        try {
          await axios
            .get(`http://localhost:5000/api/v1/users/fetch_user`, {
              params: {
                uid: user!.uid,
              },
            })
            .then((res) => {
              setCurrentUser(res.data.user);
              if (res.data.user.role == '保護者') {
                history.push('/kids');
              } else {
                history.push(
                  `daycares/${res.data.user.daycareId}/teachers/${res.data.user.id}`,
                );
              }
            })
            .catch((e) => setError(e));
        } catch (error) {
          setError(error);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
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
          <Wrapper>
            <HomeImage />
            <MyLoginPaper
              email={email}
              onChangeEmail={onChangeEmail}
              password={password}
              onChangePassword={onChangePassword}
              onClickLogin={tryLogin}
            />
          </Wrapper>
          <Body>
            <Typography variant="h4" align="center">
              Tell Meは保護者と保育園をつなげるアプリケーションです
            </Typography>
          </Body>
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
