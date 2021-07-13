import React, { memo } from 'react';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, StyledButton } from '../../atoms';
import { ChooseRole } from './ChooseRole';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(8),
        width: theme.spacing(50),
        height: theme.spacing(85),
      },
    },
  }),
);

const FlexBox = styled.div`
  display: flex;
`;

const StyledPaper = styled(Paper)`
  border-radius: 10px;
`;

export type Props = {
  role: string | null;
  email: string;
  numbers: Array<number>;
  password: string;
  firstName: string;
  lastName: string;
  gender: number | null;
  daycareId: number | null;
  telephoneNumber: string;
  onClickSignUp: () => void;
  onChangeRole: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGender: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDaycareId: (e: React.ChangeEvent<{ value: unknown }>) => void;
  onChangeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTelephoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const SignUpPaper: React.FC<Props> = memo((props) => {
  const {
    role,
    email,
    gender,
    numbers,
    lastName,
    firstName,
    password,
    daycareId,
    telephoneNumber,
    onClickSignUp,
    onChangeRole,
    onChangeEmail,
    onChangeGender,
    onChangePassword,
    onChangeLastName,
    onChangeFirstName,
    onChangeDaycareId,
    onChangeTelephoneNumber,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledPaper elevation={3}>
        <Box component="h1" pt={5} textAlign="center">
          Sign UP
        </Box>
        <FlexBox>
          <Box textAlign="center" ml={4} mr={1}>
            <TextField
              row={1}
              label="姓"
              value={lastName}
              variant="outlined"
              onChange={onChangeLastName}
            />
          </Box>
          <Box textAlign="center" mr={4} ml={1}>
            <TextField
              row={1}
              label="名"
              value={firstName}
              variant="outlined"
              onChange={onChangeFirstName}
            />
          </Box>
        </FlexBox>
        <Box textAlign="center" m={4}>
          <TextField
            row={1}
            label="電話番号"
            value={telephoneNumber}
            variant="outlined"
            isFullWidth={true}
            placeholder="ハイフンなし"
            onChange={onChangeTelephoneNumber}
          />
        </Box>
        <Box textAlign="center" m={4}>
          <TextField
            row={1}
            label="メールアドレス"
            value={email}
            variant="outlined"
            isFullWidth={true}
            placeholder="xxxxxxx@xxx.ne.jp"
            onChange={onChangeEmail}
          />
        </Box>
        <Box textAlign="center" m={4}>
          <TextField
            row={1}
            type="password"
            label="パスワード"
            value={password}
            variant="outlined"
            isFullWidth={true}
            placeholder="6文字以上"
            onChange={onChangePassword}
          />
        </Box>
        <Box m={4}>
          <ChooseRole
            role={role}
            numbers={numbers}
            gender={gender}
            daycareId={daycareId}
            onChangeRole={onChangeRole}
            onChangeGender={onChangeGender}
            onChangeDaycareId={onChangeDaycareId}
          />
        </Box>
        <Box textAlign="center" mx={2}>
          <StyledButton
            onClick={onClickSignUp}
            variant="contained"
            label="登録"
            fontSize={20}
            width={90}
            borderRadius={20}
          />
        </Box>
      </StyledPaper>
    </div>
  );
});

SignUpPaper.displayName = 'SignUpPaper';
