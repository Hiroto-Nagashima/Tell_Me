import React, { memo, ReactNode } from 'react';
import { Header } from '../organisms/Header';

type Props = {
  children: ReactNode;
};
export const HeaderLayout: React.FC<Props> = memo((props) => {
  const { children } = props;

  return (
    <>
      <Header color="primary" auth={false} />
      {children}
    </>
  );
});

HeaderLayout.displayName = 'HeaderLayout';
