import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from 'react-firebase-hooks/auth';
import { useHistory, withRouter } from 'react-router';
import * as H from 'history';
import { SignUpPaper } from '../organisms/SignUpPaper';
import { getAuth } from '../../helper/FirebaseAuthHelper';
import axios from 'axios';

type Props = {
  history: H.History;
};
// console.log("hey")

export const SignUp: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userr] = useAuthState(getAuth());
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(getAuth());

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

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User</p>
      </div>
    );
  }

  // 認証後Rails側にリクエストを送る
  const handleSubmit = () => {
    const request = async () => {
      console.log(0);
      await createUserWithEmailAndPassword(email, password);
      console.log(1);
      if (userr) {
        console.log(2);
        const token = await userr.getIdToken(true);
        console.log(3);
        const config = { headers: { authorization: `Bearer ${token}` } };
        console.log(4);
        try {
          await axios.post(
            'http://localhost:5000/api/v1/parents',
            {
              params: {
                email: email,
                password: password,
                gender: gender,
                firstName: firstName,
                lastName: lastName,
                telephoneNumber: telephoneNumber,
                config: config,
              },
            },
            config,
          );

          history.push('/home');
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    request();
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
