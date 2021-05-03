import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { SingleLineTextField } from '../atoms/SingleLineTextField';
import { FlexibleButton } from '../atoms/FlexibleButton';

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

export type Props = {
  age: number;
  parentName: string;
  kidName: string;
  daycareID: number;
  password: string;
  favoriteFood: string;
  favoritePlay: string;
  onClick: () => void;
  onChangeKidName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAge: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDaycareID: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoriteFood: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoritePlay: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RegisterKidPaper: React.FC<Props> = (props) => {
  const {
    age,
    kidName,
    daycareID,
    parentName,
    favoriteFood,
    favoritePlay,
    onClick,
    onChangeKidName,
    onChangeAge,
    onChangeDaycareID,
    onChangeFavoriteFood,
    onChangeFavoritePlay,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Box component="h2" pt={2} textAlign="center">
          ようこそ
          <br />
          {parentName}さん！
        </Box>
        <Box component="h4" px={2} textAlign="center">
          1. 保育園のIDを入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            textName="ID"
            placeholder="保育園ID"
            value={daycareID}
            onChange={onChangeDaycareID}
          />
        </Box>
        <Box component="h4" px={2} textAlign="center">
          2. お子様のお名前を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            textName="お名前"
            placeholder="空欄は入れないでください"
            value={kidName}
            onChange={onChangeKidName}
          />
        </Box>
        <Box component="h4" px={2} textAlign="center">
          3. お子様のご年齢を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            textName="ご年齢"
            placeholder="数字のみ入力してください"
            value={age}
            onChange={onChangeAge}
          />
        </Box>
        <Box component="h4" px={2} textAlign="center">
          4. お子様の好きな食べ物を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            textName="好きな食べ物"
            placeholder="餃子"
            value={favoriteFood}
            onChange={onChangeFavoriteFood}
          />
        </Box>
        <Box component="h4" px={2} textAlign="center">
          5. お子様の好きな遊びを入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            textName="好きな遊び"
            placeholder="おままごと"
            value={favoritePlay}
            onChange={onChangeFavoritePlay}
          />
        </Box>
        <Box textAlign="center" m={2}>
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
