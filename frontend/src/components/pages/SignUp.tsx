import React, { ChangeEvent, useCallback, useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as H from 'history';
import { SignUpPaper } from '../organisms/SignUpPaper';
import { getAuth } from '../../helper/FirebaseAuthHelper';
import axios from 'axios';

type Props = {
  history: H.History;
};
// console.log("hey")

export const SignUp: React.FC<Props> = () => {
  const [user, loading] = useAuthState(getAuth());
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [password, setPassword] = useState('');
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
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!loading && !user) {
    history.push('/login');
  }
  // 認証後Rails側にリクエストを送る
  const handleSubmit = () => {
    const request = async () => {
      if (user) {
        const token = await user.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        try {
          await axios.post('/api/v1/registration', {
            params: {
              email: email,
              password: password,
              gender: gender,
              firstName: firstName,
              lastName: lastName,
              telephoneNumber: telephoneNumber,
              uid: config,
            },
          });
          history.push('/');
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    request();
  };

  // // AuthContextからlogin関数を受け取る
  // const handleSubmit = () => {
  //   // e.preventDefault();
  //   signup!(email, password, history);
  // };

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
