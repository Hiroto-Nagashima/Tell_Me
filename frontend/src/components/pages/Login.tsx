import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import Image from '../../images/kid.jpg';
import { withRouter } from 'react-router';
import * as H from 'history';
import { AuthContext } from '../../auth/AuthProvider';
import { LoginPaper } from '../organisms/LoginPaper';
import styled from 'styled-components';
type Props = {
  history: H.History;
};
const BackgroundImage = styled.div`
  background-image: url(${Image});
  background-size: cover;
  background-position: center;
  height: 100vh;
`;

export const Login: React.FC<Props> = ({ history }) => {
  const { login } = useContext(AuthContext);
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
    login!(email, password, history);
  };

  return (
    <BackgroundImage>
      <LoginPaper
        email={email}
        onChangeEmail={onChangeEmail}
        password={password}
        onChangePassword={onChangePassword}
        onClick={handleSubmit}
      />
    </BackgroundImage>
  );
};
export default withRouter(Login);
