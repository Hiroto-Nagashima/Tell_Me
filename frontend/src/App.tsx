import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { SignUp } from './components/pages/SignUp';
import { Page404 } from './components/pages/Page404';
import HeaderLayoutRoute from './router/HeaderLayoutRoute';

// import { HeaderLayout } from './components/templates/HeaderLayout';
// import { DefaultLayout } from './components/templates/DefaultLayout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact={true} path="/" component={Home} />
          <HeaderLayoutRoute exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
