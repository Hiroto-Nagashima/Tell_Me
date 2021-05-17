import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { SignUp } from './components/pages/SignUp';
import { Page404 } from './components/pages/Page404';
import GlobalStyle from './theme/globalStyle';
import HeaderLayoutRoute from './router/HeaderLayoutRoute';
import { PrivateSidebarRoute } from './router/PrivateSidebarRoute';
import { RegisterKid } from './components/pages/RegisterKid';
import PrivateHeaderRoute from './router/PrivateHeaderRoute';
import { ChooseKid } from './components/pages/ChooseKid';
import { Notebook } from './components/pages/Notebook';
import { Announcement } from './components/pages/Announcement';
import { Login } from './components/pages/Login';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <HeaderLayoutRoute exact path="/" component={Login} />
          <HeaderLayoutRoute exact path="/signup" component={SignUp} />
          <PrivateHeaderRoute exact path="/kids" component={ChooseKid} />
          <PrivateHeaderRoute
            exact
            path="/kids/register"
            component={RegisterKid}
          />
          <PrivateSidebarRoute exact path="/kids/:id" component={Home} />
          <PrivateSidebarRoute
            exact
            path="/kids/:id/notebook"
            component={Notebook}
          />
          <PrivateSidebarRoute
            exact
            path="/kids/:id/announcement"
            component={Announcement}
          />
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
