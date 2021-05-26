import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import firebase from 'firebase';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../providers/UserProvider';

import { Box } from '@material-ui/core';
import { SignUpPaper } from '../organisms/SignUpPaper/SignUpPaper';
import { Spinner, CustomizedSnackbar } from '../atoms';
import { ReactComponent as Logo } from '../../images/undraw_children_4rtb.svg';

const MySignUpPaper = styled(SignUpPaper)`
  margin: 1px;
`;

const SignUpImage = styled(Logo)`
  width: 730px;
  height: 730px;
  padding-bottom: 5%;
`;

const Wrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 0 6%;
`;

export const SignUp: React.FC = () => {
  const history = useHistory();

  const lastNameError = '';
  const firstNameError = '';
  const telephoneNumberRegex = /^(0{1}\d{10,11})$/;

  const { setCurrentUser } = useContext(CurrentUserContext);

  const [role, setRole] = useState<string | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [daycareId, setDaycareId] = useState<number | null>(null);
  const [telephoneNumber, setTelephoneNumber] = useState('');

  const onChangeRole = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    return setRole(e.target.value);
  }, []);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  }, []);

  const onChangeFirstName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setFirstName(e.target.value);
  }, []);

  const onChangeLastName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setLastName(e.target.value);
  }, []);

  const onChangeGender = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setGender(value);
  }, []);

  const onChangeDaycareId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setDaycareId(value);
  }, []);

  const onChangeTelephoneNumber = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setTelephoneNumber(e.target.value);
    },
    [],
  );
  const onCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);

    return;
  };

  const trySignUp = () => {
    setLoading(true);
    if (telephoneNumber.match(telephoneNumberRegex) == null) {
      setError('電話番号が無効です');
      setLoading(false);
      setIsSnackbarOpen(true);
    } else if (lastName == lastNameError) {
      setError('姓が無効です');
      setLoading(false);
      setIsSnackbarOpen(true);
    } else if (firstName == firstNameError) {
      setError('名が無効です');
      setLoading(false);
      setIsSnackbarOpen(true);
    } else if (role == '保護者' && gender == null) {
      setError('お父様かお母様か選択してください');
      setLoading(false);
      setIsSnackbarOpen(true);
    } else if (role == '先生' && daycareId == null) {
      setError('保育園のIDを入力してください');
      setLoading(false);
      setIsSnackbarOpen(true);
    } else if (daycareId != null && gender != null) {
      setError('保育園のIDと「父か母か」を同時に選択しないでください.');
      setLoading(false);
      setIsSnackbarOpen(true);
    } else {
      const request = async () => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async () => {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (auth && currentUser) {
              const token = await currentUser.getIdToken(true);
              const config = { headers: { authorization: `Bearer ${token}` } };
              try {
                await axios
                  .post(
                    'http://localhost:5000/api/v1/users',
                    {
                      params: {
                        email: email,
                        role: role,
                        daycare_id: daycareId,
                        password: password,
                        gender: gender,
                        first_name: firstName,
                        last_name: lastName,
                        telephone_number: telephoneNumber,
                      },
                    },
                    config,
                  )
                  .then((res) => {
                    setCurrentUser(res.data.user);
                    if (res.data.user.role == '保護者') {
                      history.push('/kids/register');
                    } else {
                      history.push(
                        `daycares/${res.data.user.daycareId}/teachers/${res.data.user.id}`,
                      );
                    }
                  })
                  .catch((error) => {
                    setError(error?.message);
                    setLoading(false);
                    setIsSnackbarOpen(true);
                  });
              } catch (error) {
                setError(error);
                setLoading(false);
              }
            }
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            setLoading(false);
            setIsSnackbarOpen(true);
          })
          .finally(() => {
            setLoading(false);
            setIsSnackbarOpen(true);
          });
      };
      request();
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Wrapper>
            <SignUpImage />
            <MySignUpPaper
              email={email}
              role={role}
              daycareId={daycareId}
              password={password}
              firstName={firstName}
              lastName={lastName}
              gender={gender}
              telephoneNumber={telephoneNumber}
              onClickSignUp={trySignUp}
              onChangeDaycareId={onChangeDaycareId}
              onChangeRole={onChangeRole}
              onChangeEmail={onChangeEmail}
              onChangePassword={onChangePassword}
              onChangeFirstName={onChangeFirstName}
              onChangeLastName={onChangeLastName}
              onChangeGender={onChangeGender}
              onChangeTelephoneNumber={onChangeTelephoneNumber}
            />
          </Wrapper>
          <CustomizedSnackbar
            open={isSnackbarOpen}
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
