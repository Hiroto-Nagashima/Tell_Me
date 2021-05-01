import { ChangeEvent, useCallback, useContext, useState, VFC } from 'react';
import { withRouter } from 'react-router';
import * as H from 'history';
import { AuthContext } from '../../auth/AuthProvider';

type Props = {
  history: H.History;
};

export const SignUp: VFC<Props> = ({ history }) => {
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    signup!(email, password, history);
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
        <button onClick={handleSubmit}>SignUp</button>
      </form>
    </div>
  );
};
export default withRouter(SignUp);
