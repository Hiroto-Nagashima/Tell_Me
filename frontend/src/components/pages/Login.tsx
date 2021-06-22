import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as H from 'history';
import axios from 'axios';
import styled from 'styled-components';
import firebase from 'firebase';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../providers/UserProvider';

import NotebookImg from '../../images/notebook.jpg';
import PostImg from '../../images/post.png';
import { Box, Card, Typography } from '@material-ui/core';
import { LoginPaper } from '../organisms/LoginPaper/LoginPaper';
import { Spinner, CustomizedSnackbar } from '../atoms';
import { ReactComponent as MainLogo } from '../../images/undraw_Bibliophile_hwqc.svg';
import { ReactComponent as NotebookLogo } from '../../images/undraw_zoom_in_1txs.svg';
import { ReactComponent as MobileUser } from '../../images/undraw_mobile_user_7oqo.svg';

type Props = {
  history: H.History;
};

const AboutArea = styled(Box)`
  height: 550px;
  padding: 4%;
  background-color: white;
`;

const BackgroundImageOfNotebook = styled(NotebookLogo)`
  width: 700px;
`;

const ExplanationOfNotebook = styled(Box)`
  margin: 170px 50px 0 0;
`;

const ExplanationOfPost = styled(Box)`
  width: 60%;
  height: 150px;
  margin: 150px 0 0 0;
  padding-top: 50px;
  background-color: white;
`;

const HomeImage = styled(MainLogo)`
  width: 700px;
  height: 500px;
`;

const LoginArea = styled(Box)`
  width: 90%
  height: 670px;
  padding: 5%;
`;

const LoginSection = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const MobileUserImage = styled(MobileUser)`
  width: 800px;
  height: 400px;
`;

const MyLoginPaper = styled(LoginPaper)`
  margin: 0 0 50px 100px;
`;

const NotebookArea = styled(Box)`
  display: flex;
`;

const NotebookCard = styled(Card)`
  width: 450px;
  height: 310px;
  right: 125px;
  bottom: 130px;
  position: absolute;
  background-color: white;
`;

const NotebookImage = styled.img`
  width: 450px;
  height: 310px;
`;

const NotebookSection = styled(Box)`
  width: 700px;
  position: relative;
`;

const PostArea = styled(Box)`
  display: flex;
`;

const PostCard = styled(Card)`
  width: 420px;
  height: 140px;
  right: 300px;
  bottom: 350px;
  position: absolute;
  background-color: white;
`;

const PostImage = styled.img`
  width: 420px;
  height: 140px;
`;

const PostSection = styled(Box)`
  width: 700px;
  height: 550px;
  position: relative;
`;

const Rest0fSubject = styled(Typography)`
  width: 800px;
`;

const Slogan = styled(Box)`
  margin: 20px 0 50px 0;
  text-align: center;
`;

const Subject = styled(Box)`
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const TellMe = styled(Typography)`
  width: 200px;
  background: linear-gradient(transparent 75%, #ff9463 70%);
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
          <LoginArea>
            <Slogan>
              <Typography variant="h2">Tell Me Anything</Typography>
            </Slogan>
            <LoginSection>
              <HomeImage />
              <MyLoginPaper
                email={email}
                password={password}
                onClickLogin={tryLogin}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
              />
            </LoginSection>
          </LoginArea>
          <AboutArea>
            <Subject>
              <TellMe variant="h3" align="center">
                Tell Me
              </TellMe>
              <Rest0fSubject variant="h4" align="center">
                は保護者と保育園をつなげるアプリケーションです
              </Rest0fSubject>
            </Subject>
            <NotebookArea>
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
              <NotebookSection>
                <BackgroundImageOfNotebook />
                <NotebookCard elevation={6}>
                  <NotebookImage src={NotebookImg} alt="" />
                </NotebookCard>
              </NotebookSection>
            </NotebookArea>
            <PostArea>
              <PostSection>
                <MobileUserImage />
                <PostCard elevation={0}>
                  <PostImage src={PostImg} alt="" />
                </PostCard>
              </PostSection>
              <ExplanationOfPost>
                <Typography variant="h5" align="center">
                  先生たちが子供の様子を教えてくれます
                </Typography>
                <Box my={5}>
                  <Typography variant="h5" align="center">
                    仕事の合間にチェックしましょう
                  </Typography>
                </Box>
              </ExplanationOfPost>
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
