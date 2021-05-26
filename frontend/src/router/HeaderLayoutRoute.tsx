import React, { ComponentType } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { HeaderLayout } from '../components/templates/HeaderLayout';

type Props = {
  path: string;
  exact: boolean;
  component: ComponentType<RouteComponentProps>;
};

export const HeaderLayoutRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <HeaderLayout>
          <Component {...props} />
        </HeaderLayout>
      )}
    />
  );
};
