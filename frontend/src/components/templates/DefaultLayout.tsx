import React, { ReactNode } from 'react';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

type Props = {
  // タグで囲われているやつはReactNode
  children: ReactNode;
};
export const DefaultLayout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <>
      <Header auth={false} />
      {children}
      <Footer
        telephoneNumberOfDaycare="080-1111-1234"
        addressOfDaycare="東京都小平市学園西町1-1-1-1"
      />
    </>
  );
};

DefaultLayout.displayName = 'DefaultLayout';
