import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { SingleLineTextField, StyledButton } from '../../atoms/index';

const MyLink = styled(Link)`
  text-decoration: none;
`;

const StyledPaper = styled(Paper)`
  border-radius: 10px;
  width: 400px;
  height: 470px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        <Box component="h1" textAlign="center">
          Login
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
            label="ログイン"
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
              label="新規登録へ"
              fontSize={18}
              width={90}
              borderRadius={20}
            />
          </MyLink>
        </Box>
      </StyledPaper>
    </Wrapper>
  );
});

LoginPaper.displayName = 'LoginPaper';
