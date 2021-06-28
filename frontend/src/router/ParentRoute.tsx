import React, { ComponentType } from 'react';
import { getAuth } from '../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, RouteComponentProps } from 'react-router-dom';

import { Login } from '../components/pages/Login';
import { HeaderLayout } from '../components/templates/HeaderLayout';
import { SidebarLayout } from '../components/templates/SidebarLayout';

type Props = {
  component: ComponentType<RouteComponentProps>;
  exact: boolean;
  path: string;
};

export const ParentRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}) => {
  const [user] = useAuthState(getAuth());

  return user ? (
    <Route
      {...rest}
      render={(props) => (
        <SidebarLayout title={String(Component.displayName)}>
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
