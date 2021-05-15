import React, { ChangeEvent, useCallback, useState } from 'react';
import Image from '../../images/kid.jpeg';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase';
import * as H from 'history';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { CustomizedSnackbar } from '../atoms/CustomizedSnackbar/CustomizedSnackbar';
import { LoginPaper } from '../organisms/LoginPaper/LoginPaper';

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
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();
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

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/choose-kid');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setOpen(true);
      });
  };

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
      <CustomizedSnackbar open={open} onClose={handleClose} severity="error">
        {error}
      </CustomizedSnackbar>
    </BackgroundImage>
  );
};
export default withRouter(Login);
