import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
// import { Login } from './components/pages/Login';
import { SignUp } from './components/pages/SignUp';
import { Page404 } from './components/pages/Page404';
import GlobalStyle from './theme/globalStyle';
import HeaderLayoutRoute from './router/HeaderLayoutRoute';
import { PrivateSidebarRoute } from './router/PrivateSidebarRoute';
import { RegisterKid } from './components/pages/RegisterKid';
import PrivateHeaderRoute from './router/PrivateHeaderRoute';
import { ChooseKid } from './components/pages/ChooseKid';
import { Notebook } from './components/pages/Notebook';
import { Favorites } from './components/pages/Favorites';
import { Announcement } from './components/pages/Announcement';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <PrivateSidebarRoute exact path="/favorite" component={Favorites} />
          <PrivateSidebarRoute
            exact
            path="/announcement"
            component={Announcement}
          />
          <PrivateSidebarRoute exact path="/notebook" component={Notebook} />
          <PrivateSidebarRoute exact path="/" component={Home} />
          <PrivateHeaderRoute
            exact
            path="/register-kid"
            component={RegisterKid}
          />
          <PrivateHeaderRoute exact path="/choose-kid" component={ChooseKid} />
          <HeaderLayoutRoute exact path="/signup" component={SignUp} />
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
