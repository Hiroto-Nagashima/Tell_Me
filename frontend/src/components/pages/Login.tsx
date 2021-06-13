import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as H from 'history';
import axios from 'axios';
import styled from 'styled-components';
import firebase from 'firebase';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../providers/UserProvider';

import NotebookImg from '../../images/notebook.jpg';
import { Box, Card, Typography } from '@material-ui/core';
import { LoginPaper } from '../organisms/LoginPaper/LoginPaper';
import { Spinner, CustomizedSnackbar } from '../atoms';
import { ReactComponent as MainLogo } from '../../images/undraw_Notebook_re_id0r.svg';
import { ReactComponent as NotebookLogo } from '../../images/undraw_zoom_in_1txs.svg';

type Props = {
  history: H.History;
};
const AboutSection = styled(Box)`
  height: 800px;
  padding: 4%;
  background-color: white;
`;
const BackgroundOfNotebook = styled(NotebookLogo)`
  width: 700px;
`;

const FlexBox = styled(Box)`
  display: flex;
`;
const Rest0fSubject = styled(Typography)`
  width: 800px;
`;

const Subject = styled(Box)`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 80%;
`;

const TellMe = styled(Typography)`
  background: linear-gradient(transparent 75%, #ff9463 70%);
  width: 200px;
`;

const ExplanationOfNotebook = styled(Box)`
  margin: 170px 0 0 50px;
`;

const NotebookImage = styled.img`
  height: 310px;
  width: 450px;
`;

const NotebookArea = styled(Box)`
  position: relative;
  width: 700px;
`;
const HomeImage = styled(MainLogo)`
  width: 800px;
`;

const MyLoginPaper = styled(LoginPaper)`
  margin: 60px;
`;

const MyCard = styled(Card)`
  height: 310px;
  width: 450px;
  background-color: white;
  position: absolute;
  right: 125px;
  bottom: 130px;
`;

const LoginSection = styled(Box)`
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

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT!;

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
          <LoginSection>
            <HomeImage />
            <MyLoginPaper
              email={email}
              onChangeEmail={onChangeEmail}
              password={password}
              onChangePassword={onChangePassword}
              onClickLogin={tryLogin}
            />
            <button onClick={() => console.log(API_ENDPOINT)}>push me</button>
          </LoginSection>
          <AboutSection>
            <Subject>
              <TellMe variant="h3" align="center">
                Tell Me
              </TellMe>
              <Rest0fSubject variant="h4" align="center">
                は保護者と保育園をつなげるアプリケーションです
              </Rest0fSubject>
            </Subject>
            <FlexBox>
              <NotebookArea>
                <BackgroundOfNotebook />
                <MyCard elevation={6}>
                  <NotebookImage src={NotebookImg} alt="" />
                </MyCard>
              </NotebookArea>
              <ExplanationOfNotebook>
                <Typography variant="h5" align="center">
                  紙ベースの連絡帳とは決別です
                </Typography>
                <Box my={5}>
                  <Typography variant="h5" align="center">
                    過去の連絡帳が簡単に閲覧できます
                  </Typography>
                </Box>
                <Typography variant="h5" align="center">
                  気軽に連絡帳を書いて朝の忙しさを減らしましょう
                </Typography>
              </ExplanationOfNotebook>
            </FlexBox>
          </AboutSection>
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
