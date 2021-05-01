import React from 'react';
import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { withRouter } from 'react-router';
import * as H from 'history';
import { AuthContext } from '../../auth/AuthProvider';

type Props = {
  history: H.History;
};

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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    login!(email, password, history);
  };

  return (
    <div>
      <h1>Log in</h1>
      <form>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={onChangeEmail}
            value={email}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
            value={password}
          />
        </label>
        <button onClick={handleSubmit}>Log in</button>
      </form>
    </div>
  );
};
export default withRouter(Login);
