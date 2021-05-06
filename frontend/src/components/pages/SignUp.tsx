import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import { withRouter } from 'react-router';
import * as H from 'history';
import { AuthContext } from '../../auth/AuthProvider';
import { SignupPaper } from '../organisms/SignupPaper';

type Props = {
  history: H.History;
};

export const SignUp: React.FC<Props> = ({ history }) => {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  }, []);

  // AuthContextからlogin関数を受け取る
  const handleSubmit = () => {
    // e.preventDefault();
    signup!(email, password, history);
  };

  return (
    <SignupPaper
      email={email}
      password={password}
      onClick={handleSubmit}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
    />
  );
};
export default withRouter(SignUp);
