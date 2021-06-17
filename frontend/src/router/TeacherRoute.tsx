import React, { ComponentType } from 'react';
import { getAuth } from '../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, RouteComponentProps } from 'react-router-dom';

import { Login } from '../components/pages/Login';
import { HeaderLayout } from '../components/templates/HeaderLayout';
import { TeacherSidebarLayout } from '../components/templates/TeacherSidebarLayout';

type Props = {
  component: ComponentType<RouteComponentProps>;
  exact: boolean;
  path: string;
};

export const TeacherRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}) => {
  const [user] = useAuthState(getAuth());

  return user ? (
    <Route
      {...rest}
      render={(props) => (
        <TeacherSidebarLayout title={String(Component.displayName)}>
          <Component {...props} />
        </TeacherSidebarLayout>
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
