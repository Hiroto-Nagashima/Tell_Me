import React, { ChangeEvent, useCallback, useState } from 'react';
import { login } from '../../helper/FirebaseAuthHelper';
import Image from '../../images/kid.jpeg';
import { withRouter } from 'react-router';
import * as H from 'history';
import { LoginPaper } from '../organisms/LoginPaper';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
type Props = {
  history: H.History;
};
const BackgroundImage = styled.div`
  background-image: url(${Image});
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding-top: 120px;
`;

export const Login: React.FC<Props> = () => {
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
    login(email, password);
  };

  return (
    <BackgroundImage>
      <Grid container justify="flex-end" alignItems="flex-end">
        <Grid item xs={6}>
          <LoginPaper
            email={email}
            onChangeEmail={onChangeEmail}
            password={password}
            onChangePassword={onChangePassword}
            onClickLogin={handleSubmit}
          />
        </Grid>
      </Grid>
    </BackgroundImage>
  );
};
export default withRouter(Login);
