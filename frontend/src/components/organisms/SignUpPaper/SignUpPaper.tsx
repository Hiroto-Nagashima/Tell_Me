import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { SingleLineTextField, FlexibleButton } from '../../atoms/index';
import { ChooseRole } from '../../molecules/ChooseRole/ChooseRole';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(100),
      },
    },
  }),
);
const Flexbox = styled.div`
  display: flex;
`;

export type Props = {
  role: number | null;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: number | null;
  daycareId: number | null;
  telephoneNumber: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRole: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDaycareId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGender: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTelephoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};
export const SignUpPaper: React.FC<Props> = (props) => {
  const {
    role,
    email,
    password,
    daycareId,
    lastName,
    firstName,
    gender,
    telephoneNumber,
    onChangeEmail,
    onChangeRole,
    onChangeDaycareId,
    onChangePassword,
    onChangeFirstName,
    onChangeLastName,
    onChangeGender,
    onChangeTelephoneNumber,
    onClick,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Box component="h1" pt={2} textAlign="center">
          Sign UP
        </Box>
        <Box component="p" pt={2} textAlign="center">
          以下のフォームを入力してください
        </Box>
        <Flexbox>
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
        </Flexbox>
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
            textName="email"
            isFullWidth={true}
            placeholder="xxxxxxx@xxx.ne.jp"
            value={email}
            onChange={onChangeEmail}
          />
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            id="password"
            textName="password"
            isFullWidth={true}
            placeholder="6文字以上"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
        </Box>
        <Box m={4}>
          <ChooseRole
            role={role}
            gender={gender}
            daycareId={daycareId}
            onChangeGender={onChangeGender}
            onChangeDaycareId={onChangeDaycareId}
            onChangeRole={onChangeRole}
          />
        </Box>
        <Box textAlign="center" mx={2}>
          <FlexibleButton
            onClick={onClick}
            variant="contained"
            color="primary"
            label="登録"
          />
        </Box>
      </Paper>
    </div>
  );
};
