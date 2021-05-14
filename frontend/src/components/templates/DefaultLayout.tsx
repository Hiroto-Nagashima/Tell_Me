import React, { memo, ReactNode } from 'react';
import { Footer } from '../organisms/Footer/Footer';
import { Header } from '../organisms/Header/Header';

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
