import React from 'react';

import GlobalStyle from './theme/globalStyle';

import { UserProvider } from './providers/UserProvider';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ParentRoute } from './router/ParentRoute';
import { TeacherRoute } from './router/TeacherRoute';
import { HeaderLayoutRoute } from './router/HeaderLayoutRoute';
import { ParentHeaderLayoutRoute } from './router/ParentHeaderLayoutRoute';

import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { SignUp } from './components/pages/SignUp';
import { AllKids } from './components/pages/AllKids';
import { Page404 } from './components/pages/Page404';
import { Notebook } from './components/pages/Notebook';
import { ChooseKid } from './components/pages/ChooseKid';
import { RegisterKid } from './components/pages/RegisterKid';
import { TeacherHome } from './components/pages/TeacherHome';
import { Announcement } from './components/pages/Announcement';
import { TeacherAnnouncement } from './components/pages/TeacherAnnouncement';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <BrowserRouter>
          <Switch>
            <HeaderLayoutRoute exact path="/" component={Login} />
            <HeaderLayoutRoute exact path="/signup" component={SignUp} />
            <TeacherRoute
              exact
              path="/daycares/:daycareId/teachers/:teacherId"
              component={TeacherHome}
            />
            <TeacherRoute
              exact
              path="/daycares/:id/all-kids"
              component={AllKids}
            />
            <TeacherRoute
              exact
              path="/daycares/:daycareId/teachers/:teacherId/announcement"
              component={TeacherAnnouncement}
            />
            <ParentHeaderLayoutRoute exact path="/kids" component={ChooseKid} />
            <ParentHeaderLayoutRoute
              exact
              path="/kids/register"
              component={RegisterKid}
            />
            <ParentRoute exact path="/kids/:id" component={Home} />
            <ParentRoute exact path="/kids/:id/notebook" component={Notebook} />
            <ParentRoute
              exact
              path="/kids/:id/announcement"
              component={Announcement}
            />
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;
