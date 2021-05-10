import React, { ComponentType } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { DefaultLayout } from '../components/templates/DefaultLayout';
type Props = {
  component: ComponentType<RouteComponentProps>;
  exact: boolean;
  path: string;
};

const DefaultLayoutRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  );
};
export default DefaultLayoutRoute;
