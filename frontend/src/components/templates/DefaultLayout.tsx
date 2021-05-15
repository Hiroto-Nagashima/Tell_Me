import React, { memo, ReactNode } from 'react';
import { Footer, Header } from '../organisms/index';

type Props = {
  children: ReactNode;
};
export const DefaultLayout: React.FC<Props> = memo((props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer addressOfDaycare="hey" telephoneNumberOfDaycare="you" />
    </>
  );
});

DefaultLayout.displayName = 'DefaultLayout';
