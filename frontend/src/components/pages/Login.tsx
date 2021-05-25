import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as H from 'history';
import axios from 'axios';
// import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import firebase from 'firebase';
import { ReactComponent as Logo } from '../../images/undraw_Notebook_re_id0r.svg';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router-dom';
import { CustomizedSnackbar } from '../atoms/CustomizedSnackbar/CustomizedSnackbar';
import { LoginPaper } from '../organisms/LoginPaper/LoginPaper';
import { CurrentUserContext } from '../../providers/UserProvider';
import { Spinner } from '../atoms';
import { Box } from '@material-ui/core';

type Props = {
  history: H.History;
};

const HomeImage = styled(Logo)`
  width: 800px;
`;

const Wrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 8% 5% 5% 5%;
`;

const MyLoginPaper = styled(LoginPaper)`
  margin: 60px;
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

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

    return;
  };

  const handleSubmit = () => {
    setLoading(true);
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
              onClickLogin={handleSubmit}
            />
          </Wrapper>
          <CustomizedSnackbar
            open={open}
            onClose={handleClose}
            severity="error"
          >
            {error}
          </CustomizedSnackbar>
        </>
      )}
    </>
  );
};
