import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { withRouter } from 'react-router';
import * as H from 'history';
import { AuthContext } from '../../auth/AuthProvider';
import { SignUpPaper } from '../organisms/SignUpPaper';

type Props = {
  history: H.History;
};
// console.log("hey")

export const SignUp: React.FC<Props> = ({ history }) => {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [password, setPassword] = useState('');

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

  // AuthContextからlogin関数を受け取る
  const handleSubmit = () => {
    // e.preventDefault();
    signup!(email, password, history);
  };

  useEffect(() => {
    console.log('hey');
  }, []);

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
