import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { SignUp } from './components/pages/SignUp';
import { Page404 } from './components/pages/Page404';
import GlobalStyle from './theme/globalStyle';
import HeaderLayoutRoute from './router/HeaderLayoutRoute';
import DefaultLayoutRoute from './router/DefaultLayoutRoute';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <DefaultLayoutRoute exact={true} path="/home" component={Home} />
          <HeaderLayoutRoute exact path="/signup" component={SignUp} />
          <HeaderLayoutRoute exact path="/" component={Login} />
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
