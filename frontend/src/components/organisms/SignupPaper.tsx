import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { SingleLineTextField } from '../atoms/SingleLineTextField';
import { FlexibleButton } from '../atoms/FlexibleButton';
import { RadioButtonGroup } from '../molecules/RadioButtonGroup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(77),
      },
    },
  }),
);

export type Props = {
  email: string;
  password: string;
  parentName: string;
  radioButtonValue: 0 | 1;
  telephoneNumber: number;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeParentName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRadioButton: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTelephoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};
export const SignupPaper: React.FC<Props> = (props) => {
  const {
    email,
    password,
    parentName,
    radioButtonValue,
    telephoneNumber,
    onChangeEmail,
    onChangePassword,
    onChangeParentName,
    onChangeRadioButton,
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
        <Box m={4}>
          <RadioButtonGroup
            value={radioButtonValue}
            onChange={onChangeRadioButton}
            firstLabel="母"
            secondLabel="父"
          />
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            textName="お名前"
            isFullWidth={true}
            placeholder="お父様かお母様のお名前"
            value={parentName}
            onChange={onChangeParentName}
          />
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            textName="電話番号"
            isFullWidth={true}
            placeholder="ハイフンなし"
            value={telephoneNumber}
            onChange={onChangeTelephoneNumber}
          />
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            textName="email"
            isFullWidth={true}
            placeholder="xxxxxxx@xxx.ne.jp"
            value={email}
            onChange={onChangeEmail}
          />
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            textName="password"
            isFullWidth={true}
            placeholder="6文字以上"
            value={password}
            onChange={onChangePassword}
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
