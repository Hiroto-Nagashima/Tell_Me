import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import styled from 'styled-components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export type Props = {
  title: string;
  className?: string;
};

export const Header: React.FC<Props> = (props) => {
  const { title, className } = props;
  const classes = useStyles();

  const MyAppBar = styled(AppBar)`
    background: linear-gradient(45deg, #f25e5d 20%, #ff9463 90%);
  `;

  return (
    <MyAppBar position="fixed" className={className}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </MyAppBar>
  );
};
