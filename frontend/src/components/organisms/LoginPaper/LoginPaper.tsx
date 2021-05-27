import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { SingleLineTextField, StyledButton } from '../../atoms/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(60),
      },
    },
  }),
);

const MyLink = styled(Link)`
  text-decoration: none;
`;

export type Props = {
  email: string;
  password: string;
  onClickLogin: (e: unknown) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LoginPaper: React.FC<Props> = memo((props) => {
  const { email, password, onChangeEmail, onChangePassword, onClickLogin } =
    props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <Box component="h1" p={2} textAlign="center">
          Tell Me Everything
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            id="email"
            isFullWidth={true}
            textName="email"
            placeholder="xxxxxxx@xxx.ne.jp"
            value={email}
            onChange={onChangeEmail}
          />
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            id="password"
            isFullWidth={true}
            textName="password"
            type="password"
            placeholder="6文字以上"
            value={password}
            onChange={onChangePassword}
          />
        </Box>
        <Box textAlign="center" mx={2}>
          <StyledButton
            onClick={onClickLogin}
            label="Login"
            fontSize={18}
            width={90}
            borderRadius={20}
          />
        </Box>
        <Box textAlign="center" m={3}>
          ------アカウントをお持ちでない方------
        </Box>
        <Box textAlign="center" mx={2}>
          <MyLink to="/signup">
            <StyledButton
              label="Sign Up"
              fontSize={18}
              width={90}
              borderRadius={20}
            />
          </MyLink>
        </Box>
      </Paper>
    </div>
  );
});

LoginPaper.displayName = 'LoginPaper';
