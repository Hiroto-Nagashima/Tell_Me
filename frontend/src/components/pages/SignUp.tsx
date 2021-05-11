import React, { ChangeEvent, useCallback, useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import * as H from 'history';
import { SignUpPaper } from '../organisms/SignUpPaper';
import { getAuth } from '../../helper/firebaseAuthHelper';
import axios from 'axios';
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from 'react-firebase-hooks/auth';
import { Spinner } from '../atoms/Spinner';
// import { Spinner } from '../atoms/Spinner';

type Props = {
  history: H.History;
};

export const SignUp: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [parent] = useAuthState(getAuth());
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

  if (loading) {
    return <Spinner color="secondary" />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  // 認証後Rails側にリクエストを送る
  const handleSubmit = () => {
    const request = async () => {
      console.log('1');
      await createUserWithEmailAndPassword(email, password);
      console.log(parent);
      console.log(user);
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (auth && currentUser) {
        console.log('3');
        const token = await currentUser.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        console.log(parent);
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
          console.log('4');
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
