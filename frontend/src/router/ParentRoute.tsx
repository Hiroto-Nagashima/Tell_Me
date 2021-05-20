import React, { ComponentType, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Login } from '../components/pages/Login';
import { TeacherHome } from '../components/pages/TeacherHome';
import { HeaderLayout } from '../components/templates/HeaderLayout';
import { ParentSidebarLayout } from '../components/templates/ParentSidebarLayout';
import { TeacherSidebarLayout } from '../components/templates/TeacherSidebarLayout';
import { getAuth } from '../helper/firebaseAuthHelper';
import { CurrentUserContext } from '../providers/UserProvider';

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
  const currentUser = useContext(CurrentUserContext);
  if (user && currentUser!.role == 0) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <ParentSidebarLayout>
            <Component {...props} />
          </ParentSidebarLayout>
        )}
      />
    );
  } else if (user && currentUser!.role == 1) {
    return (
      <Route
        exact
        path={`/daycares/${currentUser!.daycareId}/teachers/${currentUser!.id}`}
        render={(props) => (
          <TeacherSidebarLayout>
            <TeacherHome {...props} />
          </TeacherSidebarLayout>
        )}
      />
    );
  } else {
    return (
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
  }
};
