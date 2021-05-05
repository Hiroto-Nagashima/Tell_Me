import React, { memo, ReactNode, VFC } from 'react';
import { Header } from '../organisms/Header';

type Props = {
  // タグで囲われているやつはReactNode
  children: ReactNode;
};
export const HeaderLayout: VFC<Props> = memo((props) => {
  const { children } = props;

  return (
    <>
      <Header auth={false} />
      {children}
    </>
  );
});

HeaderLayout.displayName = 'HeaderLayout';
