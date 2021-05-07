import React, { ComponentType } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { HeaderLayout } from '../components/templates/HeaderLayout';
type Props = {
  component: ComponentType<RouteComponentProps>;
  exact: boolean;
  path: string;
};

const LoginLayoutRoute: React.FC<Props> = ({
  component: Component,
  exact,
  path,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <HeaderLayout>
          <Component {...props} />
        </HeaderLayout>
      )}
    />
  );
};
export default LoginLayoutRoute;
