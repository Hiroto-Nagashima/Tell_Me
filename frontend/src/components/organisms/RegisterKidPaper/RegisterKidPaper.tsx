import React, { memo } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { SingleLineTextField, FlexibleButton } from '../../atoms/index';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(5),
        width: theme.spacing(70),
        height: theme.spacing(155),
      },
    },
  }),
);
const Flexbox = styled.div`
  display: flex;
  justify-content: center;
`;
export type Props = {
  age: number | null;
  gender: number;
  parentFirstName: string | null;
  parentLastName: string | null;
  firstName: string | null;
  lastName: string | null;
  daycareId: number | null;
  favoriteFood: string | null;
  favoritePlay: string | null;
  onClick: () => void;
  onChangeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGender: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAge: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDaycareId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoriteFood: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoritePlay: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RegisterKidPaper: React.FC<Props> = memo((props) => {
  const {
    age,
    gender,
    firstName,
    lastName,
    daycareId,
    parentLastName,
    parentFirstName,
    favoriteFood,
    favoritePlay,
    onClick,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeGender,
    onChangeDaycareId,
    onChangeFavoriteFood,
    onChangeFavoritePlay,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Box component="h1" pt={2} my={4} textAlign="center">
          ようこそ!
          <br />
          {parentLastName}
          {parentFirstName}さん！
        </Box>
        <Box component="h3" px={2} my={5} textAlign="center">
          1. 保育園のIDを入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            id="ID"
            isFullWidth={false}
            textName="ID"
            placeholder="保育園ID"
            value={daycareId}
            onChange={onChangeDaycareId}
          />
        </Box>
        <Box component="h3" px={2} textAlign="center">
          2. お子様のお名前を性別を選択してください
        </Box>
        <Box textAlign="center" m={4}>
          <RadioButtonGroup
            firstValue={0}
            secondValue={1}
            value={gender}
            onChange={onChangeGender}
            firstLabel="女の子"
            secondLabel="男の子"
          />
        </Box>
        <Box component="h3" px={2} my={5} textAlign="center">
          3. お子様のお名前を入力してください
        </Box>
        <Flexbox>
          <Box textAlign="center" ml={4} mr={1}>
            <SingleLineTextField
              id="姓"
              isFullWidth={false}
              textName="姓"
              placeholder="山田"
              value={lastName}
              onChange={onChangeLastName}
            />
          </Box>
          <Box textAlign="center" mr={4} ml={1}>
            <SingleLineTextField
              id="名"
              isFullWidth={false}
              textName="太郎"
              placeholder="空欄は入れないでください"
              value={firstName}
              onChange={onChangeFirstName}
            />
          </Box>
        </Flexbox>
        <Box component="h3" px={2} my={5} textAlign="center">
          4. お子様のご年齢を入力してください
        </Box>
        <Box textAlign="center" mx={5}>
          <SingleLineTextField
            id="ご年齢"
            isFullWidth={false}
            textName="ご年齢"
            placeholder="数字のみ"
            value={age}
            onChange={onChangeAge}
          />
        </Box>
        <Box component="h3" px={2} my={5} textAlign="center">
          5. お子様の好きな食べ物を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            id="好きな食べ物"
            isFullWidth={true}
            textName="好きな食べ物"
            placeholder="餃子"
            value={favoriteFood}
            onChange={onChangeFavoriteFood}
          />
        </Box>
        <Box component="h3" px={2} my={5} textAlign="center">
          6. お子様の好きな遊びを入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            id="好きな食べ物"
            isFullWidth={true}
            textName="好きな遊び"
            placeholder="おままごと"
            value={favoritePlay}
            onChange={onChangeFavoritePlay}
          />
        </Box>
        <Box textAlign="center" m={5}>
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
});

RegisterKidPaper.displayName = 'RegisterKidPaper';
