import { ComponentType, useContext, VFC } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { Login } from "../components/pages/Login";
import { RouteComponentProps } from 'react-router-dom'
type Props ={
  component:ComponentType<RouteComponentProps<number>>
  exact?: boolean
  path?:string
}

const PrivateRoute:VFC<Props> = (props) => {
  const { component, exact, path} = props
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? component : Login;

  return <Route exact={exact} path={path} component={Component} />;
};

export default PrivateRoute;
