import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
// import { login } from '../../helper/FirebaseAuthHelper';
import Image from '../../images/kid.jpeg';
import { useHistory, withRouter } from 'react-router';
import * as H from 'history';
import { LoginPaper } from '../organisms/LoginPaper';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { getAuth } from '../../helper/FirebaseAuthHelper';
import { ChooseKid } from './ChooseKid';
import { Spinner } from '../atoms/Spinner';
import { CustomizedSnackbar } from '../atoms/CustomizedSnackbar';

type Props = {
  history: H.History;
};
const BackgroundImage = styled.div`
  background-image: url(${Image});
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding-top: 120px;
`;

export const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [parent] = useAuthState(getAuth());
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(getAuth());
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  }, []);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);

    return;
  };

  const handleSubmit = async () => {
    try {
      console.log('jifjao');
      await signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <Spinner color="primary" />;
  }
  if (user) {
    return (
      <ChooseKid
        kidName={parent!.email}
        age={1}
        onClick={() => history.push('/home')}
      />
    );
  }

  return (
    <BackgroundImage>
      <Grid container justify="flex-end" alignItems="flex-end">
        <Grid item xs={6}>
          <LoginPaper
            email={email}
            onChangeEmail={onChangeEmail}
            password={password}
            onChangePassword={onChangePassword}
            onClickLogin={handleSubmit}
          />
        </Grid>
      </Grid>
      {error && (
        <CustomizedSnackbar
          open={open}
          onClose={handleClose}
          severity="warning"
        >
          ログインに失敗しました
        </CustomizedSnackbar>
      )}
    </BackgroundImage>
  );
};
export default withRouter(Login);
