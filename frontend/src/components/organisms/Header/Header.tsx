import React, { useState } from 'react';
import firebase from 'firebase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Header: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [parent] = useAuthState(getAuth());
  const history = useHistory();

  const MyAppBar = styled(AppBar)`
    background: linear-gradient(45deg, #f25e5d 20%, #ff9463 90%);
  `;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => history.push('/'))
      .catch((e) => alert(e));
  };

  return (
    <div className={classes.root}>
      <MyAppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tell Me
          </Typography>
          {parent && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => logout()}>ログアウト</MenuItem>
                <MenuItem onClick={handleClose}></MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </MyAppBar>
    </div>
  );
};
