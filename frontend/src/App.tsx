import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SignUp } from './components/pages/SignUp';
import { Page404 } from './components/pages/Page404';
import GlobalStyle from './theme/globalStyle';
import HeaderLayoutRoute from './router/HeaderLayoutRoute';
import { ParentRoute } from './router/ParentRoute';
import { RegisterKid } from './components/pages/RegisterKid';
import { ParentHeaderLayoutRoute } from './router/ParentHeaderLayoutRoute';
import { TeacherRoute } from './router/TeacherRoute';
import { ChooseKid } from './components/pages/ChooseKid';
import { Notebook } from './components/pages/Notebook';
import { Announcement } from './components/pages/Announcement';
import { Login } from './components/pages/Login';
import { Home } from './components/pages/Home';
import { TeacherHome } from './components/pages/TeacherHome';
import { TeacherAnnouncement } from './components/pages/TeacherAnnouncement';
import { UserProvider } from './providers/UserProvider';

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
              path="/daycares/:id/teachers/:id"
              component={TeacherHome}
            />
            <TeacherRoute
              exact
              path="/daycares/:id/teachers/:id/announcement"
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
