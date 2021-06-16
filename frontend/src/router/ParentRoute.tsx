import React, { ComponentType } from 'react';
import { getAuth } from '../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, RouteComponentProps } from 'react-router-dom';

import { Login } from '../components/pages/Login';
import { HeaderLayout } from '../components/templates/HeaderLayout';
import { ParentSidebarLayout } from '../components/templates/ParentSidebarLayout';

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
        <ParentSidebarLayout title={String(Component.displayName)}>
          <Component {...props} />
        </ParentSidebarLayout>
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
