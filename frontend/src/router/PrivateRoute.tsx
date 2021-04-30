import { ComponentType, useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { Login } from "../components/pages/Login";
import { RouteComponentProps } from 'react-router-dom'
type Props ={
  component:ComponentType<RouteComponentProps<number>>
}

const PrivateRoute = ({ component: RouteComponent, ...options }:Props) => {
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? RouteComponent : Login;

  return <Route {...options} component={Component} />;
};

export default PrivateRoute;
