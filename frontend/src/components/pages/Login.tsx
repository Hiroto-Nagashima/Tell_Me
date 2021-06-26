import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as H from 'history';
import axios from 'axios';
import styled from 'styled-components';
import firebase from 'firebase';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../providers/UserProvider';

import { Box, Grid, Typography } from '@material-ui/core';
import { LoginPaper } from '../organisms/LoginPaper/LoginPaper';
import { Spinner, CustomizedSnackbar } from '../atoms';
import { ReactComponent as MainLogo } from '../../images/undraw_Bibliophile_hwqc.svg';
import { ReactComponent as NotebookLogo } from '../../images/undraw_Notebook_re_id0r.svg';
import { ReactComponent as MobileUser } from '../../images/undraw_mobile_user_7oqo.svg';

type Props = {
  history: H.History;
};

const AboutArea = styled(Box)`
  padding: 4%;
`;

const Background = styled(Box)`
  background: white;
`;

const BackgroundImageOfNotebook = styled(NotebookLogo)`
  width: 100%;
  height: 320px;
`;

const ExplanationOfNotebook = styled(Grid)`
  margin-bottom: 75px;
`;

const ExplanationOfPost = styled(Grid)`
  height: 200px;
  padding: 50px 0;
`;

const HomeImage = styled(MainLogo)`
  width: 100%;
  height: 65vh;
`;

const LoginArea = styled(Grid)`
  width: 90%
  height: 670px;
  padding: 4%;
  margin-top: 50px;
  background-color: #f2ebea;
`;

const MobileUserImage = styled(MobileUser)`
  width: 100%;
  height: 280px;
`;

const MyLoginPaper = styled(LoginPaper)`
  margin: 0 0 50px 100px;
`;

const NotebookArea = styled(Grid)`
  margin-bottom: 120px;
`;

const NotebookSection = styled(Grid)`
  width: 100%;
  height: 200px;
  position: relative;
`;

const PostSection = styled(Grid)`
  width: 100%;
  height: 300px;
  position: relative;
`;

const Sentence = styled(Typography)`
  font-size: clamp(0.5rem, 8vw - 1rem, 1.5rem);
`;

const Subject = styled(Typography)`
  font-size: clamp(1.5rem, 8vw - 2rem, 3rem);
  background: linear-gradient(transparent 75%, #ff9463 70%);
`;

const Slogan = styled(Box)`
  margin-bottom: 3%;
  text-align: center;
`;

const SubjectArea = styled(Grid)`
  margin: 0 auto;
  margin-bottom: 75px;
`;

const Title = styled(Typography)`
  font-size: clamp(2.5rem, 8vw - 3rem, 5rem);
`;

export const Login: React.FC<Props> = () => {
  const history = useHistory();

  const { setCurrentUser } = useContext(CurrentUserContext);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

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
            .get(`${API_ENDPOINT}users/fetch_user`, {
              params: {
                uid: user ? user.uid : null,
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
            .catch(() => {
              firebase.auth().signOut();
              setError('ユーザーが見つかりません');
              setOpen(true);
            });
        } catch {
          setError('ログインに失敗しました');
          setOpen(true);
        }
      })
      .catch((e) => {
        if (
          e.message ==
            'There is no user record corresponding to this identifier. The user may have been deleted.' ||
          e.message == 'The email address is badly formatted.'
        ) {
          setError('メールアドレスに誤りがあります');
          setOpen(true);
        } else if (
          e.message ==
          'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
        ) {
          setError(
            '複数回ログインに失敗したので一時的にログインできません。時間を置いて試してください',
          );
          setOpen(true);
        } else if (
          e.message ==
          'The password is invalid or the user does not have a password.'
        ) {
          setError('パスワードに誤りがあります');
          setOpen(true);
        } else {
          setError(e.message);
          setOpen(true);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Background>
          <LoginArea container justify="center">
            <Grid item xs={12}>
              <Slogan>
                <Title variant="h2" noWrap>
                  Tell Me Anything
                </Title>
              </Slogan>
            </Grid>
            <Grid container justify="space-between">
              <Grid item lg={7} xs={12}>
                <HomeImage />
              </Grid>
              <Grid item lg={4} xs={12}>
                <MyLoginPaper
                  email={email}
                  password={password}
                  onClickLogin={tryLogin}
                  onChangeEmail={onChangeEmail}
                  onChangePassword={onChangePassword}
                />
              </Grid>
            </Grid>
          </LoginArea>
          <AboutArea>
            <SubjectArea container justify="center" align-items="center">
              <Grid item md={8} xs={12}>
                <Subject variant="h4" align="center" noWrap>
                  保護者と保育園をつなげます
                </Subject>
              </Grid>
            </SubjectArea>
            <NotebookArea container direction="row" justify="center">
              <ExplanationOfNotebook item md={5} xs={12}>
                <Sentence variant="h5" align="center">
                  紙ベースの連絡帳とは決別です
                </Sentence>
                <Box my={5}>
                  <Sentence variant="h5" align="center">
                    過去の連絡帳が簡単に閲覧できます
                  </Sentence>
                </Box>
                <Sentence variant="h5" align="center">
                  気軽に連絡帳を書いて朝の忙しさを減らしましょう
                </Sentence>
              </ExplanationOfNotebook>
              <NotebookSection item md={6} sm={10} xs={12}>
                <BackgroundImageOfNotebook />
              </NotebookSection>
            </NotebookArea>
            <Grid container justify="center" direction="row-reverse">
              <ExplanationOfPost item md={5} xs={12}>
                <Sentence variant="h5" align="center">
                  先生たちが子供の様子を教えてくれます
                </Sentence>
                <Box my={5}>
                  <Sentence variant="h5" align="center">
                    仕事の合間にチェックしましょう
                  </Sentence>
                </Box>
              </ExplanationOfPost>
              <PostSection item md={6} sm={10} xs={12}>
                <MobileUserImage />
              </PostSection>
            </Grid>
          </AboutArea>
          <CustomizedSnackbar
            open={open}
            onClose={onCloseSnackbar}
            severity="error"
          >
            {error}
          </CustomizedSnackbar>
        </Background>
      )}
    </>
  );
};
