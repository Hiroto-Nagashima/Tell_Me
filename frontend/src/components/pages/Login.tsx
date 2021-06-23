import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as H from 'history';
import axios from 'axios';
import styled from 'styled-components';
import firebase from 'firebase';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../providers/UserProvider';

import PostImg from '../../images/post.png';
import { Box, Card, Grid, Typography } from '@material-ui/core';
import { LoginPaper } from '../organisms/LoginPaper/LoginPaper';
import { Spinner, CustomizedSnackbar } from '../atoms';
import { ReactComponent as MainLogo } from '../../images/undraw_Bibliophile_hwqc.svg';
import { ReactComponent as NotebookLogo } from '../../images/undraw_Notebook_re_id0r.svg';
import { ReactComponent as MobileUser } from '../../images/undraw_mobile_user_7oqo.svg';

type Props = {
  history: H.History;
};

const AboutArea = styled(Box)`
  height: 800px;
  padding: 4%;
  background-color: white;
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
`;

const MobileUserImage = styled(MobileUser)`
  width: 100%;
  height: 450px;
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

const PostArea = styled(Grid)`
  display: flex;
  height: 60vh;
`;

const PostCard = styled(Card)`
  width: 420px;
  position: absolute;
  background-color: white;
`;

const PostImage = styled.img`
  width: 100%;
`;

const PostSection = styled(Grid)`
  width: 100%;
  height: 300px;
  position: relative;
`;

const Rest0fSubject = styled(Typography)`
  background: linear-gradient(transparent 75%, #ff9463 70%);
  );
`;

const Slogan = styled(Box)`
  margin-bottom: 3%;
  text-align: center;
`;

const Subject = styled(Grid)`
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 75px;
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
        <>
          <LoginArea container justify="center">
            <Grid item xs={12}>
              <Slogan>
                <Typography variant="h2" noWrap>
                  Tell Me Anything
                </Typography>
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
            <Subject container justify="center">
              <Grid item md={8} xs={12}>
                <Rest0fSubject variant="h4" align="center" noWrap>
                  保護者と保育園をつなげます
                </Rest0fSubject>
              </Grid>
            </Subject>
            <NotebookArea container direction="row" justify="center">
              <ExplanationOfNotebook item md={5} xs={12}>
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
              <NotebookSection item md={6} sm={10} xs={12}>
                <BackgroundImageOfNotebook />
              </NotebookSection>
            </NotebookArea>
            <PostArea container justify="center" direction="row-reverse">
              <ExplanationOfPost item md={5} xs={12}>
                <Typography variant="h5" align="center">
                  先生たちが子供の様子を教えてくれます
                </Typography>
                <Box my={5}>
                  <Typography variant="h5" align="center">
                    仕事の合間にチェックしましょう
                  </Typography>
                </Box>
              </ExplanationOfPost>
              <PostSection item md={6} sm={10} xs={12}>
                <Grid container justify="center">
                  <Grid item sm={10} xs={12}>
                    <PostCard elevation={0}>
                      <PostImage src={PostImg} alt="" />
                    </PostCard>
                  </Grid>
                  <Grid item sm={10} xs={12}>
                    <MobileUserImage />
                  </Grid>
                </Grid>
              </PostSection>
            </PostArea>
          </AboutArea>
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
