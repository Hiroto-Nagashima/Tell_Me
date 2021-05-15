import React, { ComponentType } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Login } from '../components/pages/Login';
import { HeaderLayout } from '../components/templates/HeaderLayout';
import { SidebarLayout } from '../components/templates/SidebarLayout';
import { getAuth } from '../helper/firebaseAuthHelper';

type Props = {
  component: ComponentType<RouteComponentProps>;
  exact: boolean;
  path: string;
};

export const PrivateSidebarRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}) => {
  const [user] = useAuthState(getAuth());

  return user ? (
    <Route
      {...rest}
      render={(props) => (
        <SidebarLayout>
          <Component {...props} />
        </SidebarLayout>
      )}
    />
  ) : (
    <Route
      exact
      path={'/'}
      render={(props) => (
        <HeaderLayout>
          <Login {...props} />
        </HeaderLayout>
      )}
    />
  );
};
