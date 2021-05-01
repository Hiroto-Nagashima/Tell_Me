import { BrowserRouter,Switch, Route } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { SignUp } from "./components/pages/SignUp";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
