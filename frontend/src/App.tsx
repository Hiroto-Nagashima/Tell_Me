import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { SignUp } from './components/pages/SignUp';
import { HeaderLayout } from './components/templates/HeaderLayout';
import { DefaultLayout } from './components/templates/DefaultLayout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <DefaultLayout>
            <PrivateRoute exact path="/" component={Home} />
          </DefaultLayout>
          <HeaderLayout>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </HeaderLayout>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
