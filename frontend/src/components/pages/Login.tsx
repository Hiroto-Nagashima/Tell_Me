import React, { ChangeEvent, useCallback, useState } from 'react';
import Image from '../../images/kid.jpeg';
import { withRouter } from 'react-router';
import * as H from 'history';
import { LoginPaper } from '../organisms/LoginPaper';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { CustomizedSnackbar } from '../atoms/CustomizedSnackbar';
import firebase from 'firebase';

const BackgroundImage = styled.div`
  background-image: url(${Image});
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding-top: 120px;
`;

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  // const [parent] = useAuthState(getAuth());
  const [open, setOpen] = useState(false);
  // const history = useHistory();
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
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setOpen(true);
      });
  };

  // if (loading) {
  //   return <Spinner color="primary" />;
  // }
  // if (user) {
  //   return (
  //     <ChooseKid
  //       kidName={parent!.email}
  //       age={1}
  //       onClick={() => signInWithEmailAndPassword(email, password)}
  //     />
  //   );
  // }

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
