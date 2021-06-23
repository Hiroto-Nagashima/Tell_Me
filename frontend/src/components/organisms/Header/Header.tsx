import React, { useContext } from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Box, IconButton } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../../../helper/firebaseAuthHelper';
import { Link } from 'react-router-dom';

import { CurrentKidContext } from '../../../providers/KidProvider';

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

export type Props = {
  title: string;
  appBarClassName?: string;
  iconButtonClassName?: string;
  onClickTitle?: () => void;
};

export const Header: React.FC<Props> = (props) => {
  const { title, iconButtonClassName, appBarClassName, onClickTitle } = props;
  const [user] = useAuthState(getAuth());
  const { currentKid } = useContext(CurrentKidContext);

  return (
    <MyAppBar position="fixed" className={appBarClassName}>
      <Toolbar>
        {user && currentKid.id ? (
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
            <div></div>
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
