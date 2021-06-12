import React from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Box, IconButton } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../../../helper/firebaseAuthHelper';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
`;

const MyAppBar = styled(AppBar)`
  background: linear-gradient(45deg, #f25e5d 20%, #ff9463 90%);
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 10px 10px 10px 10px;
  padding-top: 10px;
  height: 32px;
  font-size: 16px;
`;

const SignUpLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 0 10px;
  padding: 6px;
  height: 32px;
  font-size: 16px;
  background-color: #f2ebea;
  border-radius: 17px;
`;

const Logout = styled(Box)`
  padding: 6px;
  height: 32px;
  font-size: 17px;
  border-radius: 17px;
  cursor: pointer;
`;

export type Props = {
  title: string;
  appBarClassName?: string;
  iconButtonClassName?: string;
  onClickTitle?: () => void;
};

export const Header: React.FC<Props> = (props) => {
  const { title, iconButtonClassName, appBarClassName, onClickTitle } = props;
  const [user] = useAuthState(getAuth());
  const history = useHistory();

  const logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => history.push('/'))
      .catch((e) => alert(e));
  };

  return (
    <MyAppBar position="fixed" className={appBarClassName}>
      <Toolbar>
        {user ? (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onClickTitle}
            className={iconButtonClassName}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <div></div>
        )}
        <FlexBox>
          <Box ml={3}>
            <Typography variant="h5">{title}</Typography>
          </Box>
          {user ? (
            <Box>
              <Logout onClick={() => logout()}>ログアウト</Logout>
            </Box>
          ) : (
            <Box>
              <LoginLink to="/">ログイン</LoginLink>
              <SignUpLink to="/signup">新規登録</SignUpLink>
            </Box>
          )}
        </FlexBox>
      </Toolbar>
    </MyAppBar>
  );
};
