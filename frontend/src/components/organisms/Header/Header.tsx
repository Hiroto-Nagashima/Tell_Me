import React from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';

const MyAppBar = styled(AppBar)`
  background: linear-gradient(45deg, #f25e5d 20%, #ff9463 90%);
`;

export type Props = {
  title: string;
  appBarClassName?: string;
  iconButtonClassName?: string;
  onClickTitle?: () => void;
};

export const Header: React.FC<Props> = (props) => {
  const { title, iconButtonClassName, appBarClassName, onClickTitle } = props;

  return (
    <MyAppBar position="fixed" className={appBarClassName}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClickTitle}
          className={iconButtonClassName}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </MyAppBar>
  );
};
