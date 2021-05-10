import React, { ChangeEvent, useCallback, useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import * as H from 'history';
import { SignUpPaper } from '../organisms/SignUpPaper';
import { getAuth } from '../../helper/FirebaseAuthHelper';
import axios from 'axios';
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from 'react-firebase-hooks/auth';
import { Spinner } from '../atoms/Spinner';
// import { HeaderLayout } from '../templates/HeaderLayout';
// import { RegisterKidPaper } from '../organisms/RegisterKidPaper';

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
    return <Spinner color="primary" />;
  }
  if (user) {
    return (
      // <HeaderLayout>
      //   <RegisterKidPaper age={1} kidName={hoge}  />
      // </HeaderLayout>
      <div>hoge</div>
    );
  }

  // 認証後Rails側にリクエストを送る
  const handleSubmit = () => {
    const request = async () => {
      await createUserWithEmailAndPassword(email, password);
      if (parent) {
        const token = await parent.getIdToken(true);
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
