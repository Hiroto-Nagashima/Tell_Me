import React, { ComponentType } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { HeaderLayout } from '../components/templates/HeaderLayout';
type Props = {
  component: ComponentType<RouteComponentProps>;
};

const LoginLayoutRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <HeaderLayout>
          <Component {...props} />
        </HeaderLayout>
      )}
    />
  );
};
export default LoginLayoutRoute;
