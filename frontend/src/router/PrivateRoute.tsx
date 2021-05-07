import React, { ComponentType, useContext, useEffect } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { Login } from '../components/pages/Login';
type Props = {
  component: ComponentType<RouteComponentProps>;
  exact?: boolean;
  path?: string;
};

const PrivateRoute: React.FC<Props> = (props) => {
  const { component, exact, path } = props;
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? component : Login;
  useEffect(() => {
    console.log('hey');
  }, []);

  return <Route exact={exact} path={path} component={Component} />;
};

export default PrivateRoute;
