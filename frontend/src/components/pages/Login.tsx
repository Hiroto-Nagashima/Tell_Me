import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as H from 'history';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Image from '../../images/kid.jpeg';
import styled from 'styled-components';
import firebase from 'firebase';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router-dom';
import { CustomizedSnackbar } from '../atoms/CustomizedSnackbar/CustomizedSnackbar';
import { LoginPaper } from '../organisms/LoginPaper/LoginPaper';
import { CurrentUserContext } from '../../providers/UserProvider';

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
  const history = useHistory();
  const { setCurrentUser } = useContext(CurrentUserContext);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

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
      .then(async () => {
        const loginUser = getAuth().currentUser;
        try {
          await axios
            .get(`http://localhost:5000/api/v1/users/fetchUser`, {
              params: {
                uid: loginUser!.uid,
              },
            })
            .then((res) => {
              setCurrentUser(res.data);
              if (res.data.role == '保護者') {
                history.push('/kids');
              } else {
                history.push(
                  `daycares/${res.data.daycare_id}/teachers/${res.data.id}`,
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
