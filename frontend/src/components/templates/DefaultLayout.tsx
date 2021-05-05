import React, { memo, ReactNode, VFC } from 'react';
import { Footer } from '../organisms/Footer';

type Props = {
  // タグで囲われているやつはReactNode
  children: ReactNode;
};
export const DefaultLayout: VFC<Props> = memo((props) => {
  const { children } = props;

  return (
    <>
      {children}
      <Footer addressOfDaycare="hey" telephoneNumberOfDaycare="you" />
    </>
  );
});

DefaultLayout.displayName = 'DefaultLayout';
