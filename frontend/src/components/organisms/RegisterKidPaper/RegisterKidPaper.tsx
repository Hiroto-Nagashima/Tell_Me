import React, { memo } from 'react';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { SingleLineTextField, StyledButton } from '../../atoms/index';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(5),
        width: theme.spacing(60),
        height: theme.spacing(143),
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
  gender: number;
  parentFirstName: string | null;
  parentLastName: string | null;
  firstName: string | null;
  lastName: string | null;
  daycareId: number | null;
  favoriteFood: string | null;
  favoritePlay: string | null;
  onClickRegister: () => void;
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
          <SingleLineTextField
            id="ID"
            isFullWidth={false}
            textName="ID"
            placeholder="保育園ID"
            value={daycareId}
            onChange={onChangeDaycareId}
          />
        </Box>
        <Box component="h3" px={2}>
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
        <Box component="h3" px={2} my={5}>
          3. お子様のお名前を入力してください
        </Box>
        <FlexBox>
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
              textName="名"
              placeholder="空欄は入れないでください"
              value={firstName}
              onChange={onChangeFirstName}
            />
          </Box>
        </FlexBox>
        <Box component="h3" px={2} my={5}>
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
        <Box component="h3" px={2} my={5}>
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
        <Box component="h3" px={2} my={5}>
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
          <StyledButton
            onClick={onClickRegister}
            variant="contained"
            label="登録"
            fontSize={20}
            width={80}
            borderRadius={20}
          />
        </Box>
      </StyledPaper>
    </div>
  );
});

RegisterKidPaper.displayName = 'RegisterKidPaper';
