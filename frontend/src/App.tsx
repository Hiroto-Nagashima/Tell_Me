import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
// import { Login } from './components/pages/Login';
import { SignUp } from './components/pages/SignUp';
import { Page404 } from './components/pages/Page404';
import GlobalStyle from './theme/globalStyle';
import HeaderLayoutRoute from './router/HeaderLayoutRoute';
import PrivateRoute from './router/PrivateRoute';
import { RegisterKid } from './components/pages/RegisterKid';
import PrivateHeaderRoute from './router/PrivateHeaderRoute';
import { ChooseKid } from './components/pages/ChooseKid';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
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
