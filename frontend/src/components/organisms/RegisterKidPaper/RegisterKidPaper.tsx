import React, { memo } from 'react';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { StyledButton, TextField } from '../../atoms/index';
import { LabeledTextField } from '../../molecules/LabeledTextField/LabeledTextField';
import { LabeledRadioButtonGroup } from '../../molecules/LabeledRadioButtonGroup/LabeledRadioButtonGroup';
import { LabeledSelectMenu } from '../../molecules/LabeledSelectMenu/LabeledSelectMenu';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  padding: 2% 5%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 600px;
  margin: 9% 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export type Props = {
  age: number | null;
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
  onChangeAge: (e: React.ChangeEvent<{ value: unknown }>) => void;
  onChangeDaycareId: (e: React.ChangeEvent<{ value: unknown }>) => void;
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

  const ages = [1, 2, 3, 4, 5];
  const daycareIds = [1, 2, 3];

  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        <Box component="h2">ようこそ!</Box>
        <Box component="h1" mb={4} textAlign="center">
          {parentLastName}
          {parentFirstName}さん
        </Box>
        <LabeledSelectMenu
          value={daycareId}
          numbers={daycareIds}
          mainLabel="1. 保育園のIDを入力してください"
          menuLabel="保育園のID"
          onChange={onChangeDaycareId}
        />
        <LabeledRadioButtonGroup
          value={gender}
          component="h3"
          mainLabel="2. お子様の性別を選択してください"
          firstValue={0}
          secondValue={1}
          firstLabel="女の子"
          secondLabel="男の子"
          onChange={onChangeGender}
        />
        <Box component="h3" px={4} my={4}>
          3. お子様のお名前を入力してください
        </Box>
        <FlexBox>
          <Box textAlign="center" ml={4} mr={1}>
            <TextField
              row={1}
              label="姓"
              value={lastName}
              variant="outlined"
              isFullWidth={false}
              placeholder="山田"
              onChange={onChangeLastName}
            />
          </Box>
          <Box textAlign="center" mr={4} ml={1}>
            <TextField
              row={1}
              label="名"
              value={firstName}
              variant="outlined"
              isFullWidth={false}
              placeholder="太郎"
              onChange={onChangeFirstName}
            />
          </Box>
        </FlexBox>
        <LabeledSelectMenu
          value={age}
          numbers={ages}
          mainLabel="4. お子様のご年齢を入力してください"
          menuLabel="年齢"
          onChange={onChangeAge}
        />
        <LabeledTextField
          row={1}
          value={favoriteFood}
          component="h3"
          mainLabel="5. お子様の好きな食べ物を入力してください"
          inputLabel="好きな食べ物(20字以内)"
          placeholder="餃子"
          isFullWidth={true}
          onChange={onChangeFavoriteFood}
        />
        <LabeledTextField
          row={1}
          value={favoritePlay}
          component="h3"
          mainLabel="6. お子様の好きな遊びを入力してください"
          inputLabel="好きな遊び(20字以内)"
          placeholder="おままごと"
          isFullWidth={true}
          onChange={onChangeFavoritePlay}
        />
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
    </Wrapper>
  );
});

RegisterKidPaper.displayName = 'RegisterKidPaper';
