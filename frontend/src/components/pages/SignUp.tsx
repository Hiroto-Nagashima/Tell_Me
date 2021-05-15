import React, { ChangeEvent, useCallback, useState } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory, withRouter } from 'react-router';
import { SignUpPaper } from '../organisms/SignUpPaper/SignUpPaper';
import { CustomizedSnackbar } from '../atoms/CustomizedSnackbar/CustomizedSnackbar';

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const telephoneNumberRegex = /^(0{1}\d{10,11})$/;
  const firstNameError = '';
  const lastNameError = '';

  const history = useHistory();

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

  const onChangeTelephoneNumber = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setTelephoneNumber(e.target.value);
    },
    [],
  );
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);

    return;
  };

  const handleSubmit = () => {
    if (telephoneNumber.match(telephoneNumberRegex) == null) {
      setError('telephone number is invalid');
      setOpen(true);
    } else if (lastName == lastNameError) {
      setError('last name is invalid');
      setOpen(true);
    } else if (firstName == firstNameError) {
      setError('first name is invalid');
      setOpen(true);
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
                await axios.post(
                  'http://localhost:5000/api/v1/parents',
                  {
                    params: {
                      email: email,
                      password: password,
                      gender: gender,
                      first_name: firstName,
                      last_name: lastName,
                      telephone_number: telephoneNumber,
                    },
                  },
                  config,
                );
                history.push('/register-kid');
              } catch (error) {
                setError(error?.message);
                setOpen(true);
              }
            }
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            setOpen(true);
          });
      };
      request();
    }
  };

  return (
    <>
      <SignUpPaper
        email={email}
        password={password}
        firstName={firstName}
        lastName={lastName}
        gender={gender}
        telephoneNumber={telephoneNumber}
        onClick={handleSubmit}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onChangeFirstName={onChangeFirstName}
        onChangeLastName={onChangeLastName}
        onChangeGender={onChangeGender}
        onChangeTelephoneNumber={onChangeTelephoneNumber}
      />
      <CustomizedSnackbar open={open} onClose={handleClose} severity="error">
        {error}
      </CustomizedSnackbar>
    </>
  );
};
export default withRouter(SignUp);
