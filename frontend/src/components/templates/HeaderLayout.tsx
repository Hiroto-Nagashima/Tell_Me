import React, { memo, ReactNode } from 'react';
import { Header } from '../organisms/Header';

type Props = {
  // タグで囲われているやつはReactNode
  children: ReactNode;
};
export const HeaderLayout: React.FC<Props> = memo((props) => {
  const { children } = props;

  return (
    <>
      <Header auth={false} />
      {children}
    </>
  );
});

HeaderLayout.displayName = 'HeaderLayout';
