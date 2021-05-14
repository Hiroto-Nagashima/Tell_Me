import React, { ChangeEvent, useCallback, useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import { SignUpPaper } from '../organisms/SignUpPaper/SignUpPaper';
import { getAuth } from '../../helper/firebaseAuthHelper';
import axios from 'axios';
// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import { Spinner } from '../atoms/Spinner/Spinner';
import firebase from 'firebase';

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [password, setPassword] = useState('');
  // const [createUserWithEmailAndPassword, user, loading, error] =
  //   useCreateUserWithEmailAndPassword(getAuth());

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

  const handleSubmit = () => {
    if (telephoneNumber.match(telephoneNumberRegex) == null) {
      alert('telephone_numberエラー');
    } else if (lastName == lastNameError) {
      alert('lastNameError');
    } else if (firstName == firstNameError) {
      alert('firstNameError');
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
                alert(error?.message);
              }
            }
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
          });
      };
      request();
    }
  };

  return (
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
  );
};
export default withRouter(SignUp);
