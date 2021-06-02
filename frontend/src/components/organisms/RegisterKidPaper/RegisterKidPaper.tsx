import React, { memo } from 'react';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import { Box, Grid } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { SingleLineTextField, StyledButton } from '../../atoms/index';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup/RadioButtonGroup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(4),
        width: theme.spacing(60),
        height: theme.spacing(152),
      },
    },
  }),
);

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  border-radius: 20px;
`;

export type Props = {
  age: string | null;
  error: string;
  gender: number;
  firstName: string | null;
  lastName: string | null;
  daycareId: number | null;
  favoriteFood: string | null;
  favoritePlay: string | null;
  isSnackbarOpen: boolean;
  parentLastName: string | null;
  parentFirstName: string | null;
  onClickRegister: () => void;
  onCloseSnackbar: () => void;
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
    lastName,
    firstName,
    daycareId,
    favoritePlay,
    favoriteFood,
    parentLastName,
    parentFirstName,
    onChangeAge,
    onChangeGender,
    onChangeLastName,
    onChangeFirstName,
    onChangeDaycareId,
    onChangeFavoriteFood,
    onChangeFavoritePlay,
    onClickRegister,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledPaper elevation={3}>
        <Box component="h2">ようこそ!</Box>
        <Box component="h1" mb={4} textAlign="center">
          {parentLastName}
          {parentFirstName}さん
        </Box>
        <Box component="h3" px={2} my={5}>
          1. 保育園のIDを入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <Grid container xs={4}>
            <SingleLineTextField
              id="ID"
              type="number"
              value={daycareId}
              textName="ID"
              isFullWidth={false}
              placeholder="保育園ID"
              onChange={onChangeDaycareId}
            />
          </Grid>
        </Box>
        <Box component="h3" px={2} my={5}>
          2. お子様のお名前を性別を選択してください
        </Box>
        <Box m={4}>
          <RadioButtonGroup
            value={gender}
            firstValue={0}
            secondValue={1}
            firstLabel="女の子"
            secondLabel="男の子"
            onChange={onChangeGender}
          />
        </Box>
        <Box component="h3" px={2} my={5}>
          3. お子様のお名前を入力してください
        </Box>
        <FlexBox>
          <Box textAlign="center" ml={4} mr={1}>
            <SingleLineTextField
              id="姓"
              value={lastName}
              textName="姓"
              placeholder="山田"
              isFullWidth={false}
              onChange={onChangeLastName}
            />
          </Box>
          <Box textAlign="center" mr={4} ml={1}>
            <SingleLineTextField
              id="名"
              value={firstName}
              textName="名"
              placeholder="空欄は入れないでください"
              isFullWidth={false}
              onChange={onChangeFirstName}
            />
          </Box>
        </FlexBox>
        <Box component="h3" px={2} my={5}>
          4. お子様のご年齢を入力してください
        </Box>
        <Box textAlign="center" mx={5}>
          <Grid container xs={4}>
            <SingleLineTextField
              id="ご年齢"
              type="number"
              value={age}
              textName="ご年齢"
              isFullWidth={false}
              placeholder="数字のみ"
              onChange={onChangeAge}
            />
          </Grid>
        </Box>
        <Box component="h3" px={2} my={5}>
          5. お子様の好きな食べ物を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            id="好きな食べ物"
            value={favoriteFood}
            textName="好きな食べ物(20字以内)"
            placeholder="餃子"
            isFullWidth={true}
            onChange={onChangeFavoriteFood}
          />
        </Box>
        <Box component="h3" px={2} my={5}>
          6. お子様の好きな遊びを入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            id="好きな食べ物"
            value={favoritePlay}
            textName="好きな遊び(20字以内)"
            placeholder="おままごと"
            isFullWidth={true}
            onChange={onChangeFavoritePlay}
          />
        </Box>
        <Box textAlign="center" m={5}>
          <StyledButton
            width={80}
            label="登録"
            variant="contained"
            fontSize={20}
            borderRadius={20}
            onClick={onClickRegister}
          />
        </Box>
      </StyledPaper>
    </div>
  );
});

RegisterKidPaper.displayName = 'RegisterKidPaper';
