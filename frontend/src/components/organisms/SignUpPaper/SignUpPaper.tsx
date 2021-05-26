import React, { memo } from 'react';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { SingleLineTextField, FlexibleButton } from '../../atoms/index';
import { ChooseRole } from '../../molecules/ChooseRole/ChooseRole';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(100),
      },
    },
  }),
);

const FlexBox = styled.div`
  display: flex;
`;

export type Props = {
  role: string | null;
  email: string;
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
  onChangeDaycareId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTelephoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const SignUpPaper: React.FC<Props> = memo((props) => {
  const {
    role,
    email,
    gender,
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
      <Paper elevation={0}>
        <Box component="h1" pt={2} textAlign="center">
          Sign UP
        </Box>
        <Box component="p" pt={2} textAlign="center">
          以下のフォームを入力してください
        </Box>
        <FlexBox>
          <Box textAlign="center" ml={4} mr={1}>
            <SingleLineTextField
              id="姓"
              textName="姓"
              isFullWidth={false}
              placeholder="親御様の姓"
              value={lastName}
              onChange={onChangeLastName}
            />
          </Box>
          <Box textAlign="center" mr={4} ml={1}>
            <SingleLineTextField
              id="名"
              textName="名"
              isFullWidth={false}
              placeholder="親御様の名"
              value={firstName}
              onChange={onChangeFirstName}
            />
          </Box>
        </FlexBox>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            id="電話番号"
            textName="電話番号"
            isFullWidth={true}
            placeholder="ハイフンなし"
            value={telephoneNumber}
            onChange={onChangeTelephoneNumber}
          />
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            id="email"
            textName="メールアドレス"
            isFullWidth={true}
            placeholder="xxxxxxx@xxx.ne.jp"
            value={email}
            onChange={onChangeEmail}
          />
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            id="password"
            textName="パスワード"
            isFullWidth={true}
            placeholder="6文字以上"
            value={password}
            onChange={onChangePassword}
            type="password"
          />
        </Box>
        <Box m={4}>
          <ChooseRole
            role={role}
            gender={gender}
            daycareId={daycareId}
            onChangeRole={onChangeRole}
            onChangeGender={onChangeGender}
            onChangeDaycareId={onChangeDaycareId}
          />
        </Box>
        <Box textAlign="center" mx={2}>
          <FlexibleButton
            onClick={onClickSignUp}
            variant="contained"
            color="primary"
            label="登録"
          />
        </Box>
      </Paper>
    </div>
  );
});

SignUpPaper.displayName = 'SignUpPaper';
