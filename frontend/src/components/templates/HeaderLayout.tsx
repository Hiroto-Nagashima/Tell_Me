import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { memo, ReactNode } from 'react';

import { Header } from '../organisms/Header/Header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  }),
);

type Props = {
  children: ReactNode;
};

export const HeaderLayout: React.FC<Props> = memo((props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <>
      <Header title="Tell Me" iconButtonClassName={classes.menuButton} />
      {children}
    </>
  );
});

HeaderLayout.displayName = 'HeaderLayout';
