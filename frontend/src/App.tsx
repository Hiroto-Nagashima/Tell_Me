import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import { Home }from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { SignUp } from "./components/pages/SignUp";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
