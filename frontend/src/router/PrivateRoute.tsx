import React, { ComponentType } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Login } from '../components/pages/Login';
import { getAuth } from '../helper/FirebaseAuthHelper';

type Props = {
  component: ComponentType<RouteComponentProps>;
  exact: boolean;
  path: string;
};

const PrivateRoute: React.FC<Props> = (props) => {
  const [user] = useAuthState(getAuth());

  return user ? (
    <Route {...props} />
  ) : (
    <Route exact path={'/'} component={Login} />
  );
};
export default PrivateRoute;
