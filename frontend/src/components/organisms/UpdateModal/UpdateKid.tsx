import React, { ChangeEvent, memo } from 'react';
import styled from 'styled-components';

import { Box, Grid } from '@material-ui/core';
import { SelectMenu, TextField, RadioButtonGroup } from '../../atoms';
import { AlignedTextFields } from '../../molecules/AlignedTextFields/AlignedTextFields';

const FlexBox = styled(Box)`
  display: flex;
`;

export type Props = {
  age: number | null;
  gender: number;
  firstName: string | null;
  lastName: string | null;
  favoriteFood: string | null;
  favoritePlay: string | null;
  onChangeAge: (e: React.ChangeEvent<{ value: unknown }>) => void;
  onChangeGender: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoriteFood: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoritePlay: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UpdateKid: React.FC<Props> = memo((props) => {
  const {
    age,
    gender,
    lastName,
    firstName,
    favoriteFood,
    favoritePlay,
    onChangeAge,
    onChangeGender,
    onChangeLastName,
    onChangeFirstName,
    onChangeFavoriteFood,
    onChangeFavoritePlay,
  } = props;

  const ages = [1, 2, 3, 4, 5];

  return (
    <>
      <FlexBox my={2} ml={4}>
        <Box mr={3}>
          <RadioButtonGroup
            value={gender}
            firstValue={0}
            secondValue={1}
            onChange={onChangeGender}
            firstLabel="女の子"
            secondLabel="男の子"
          />
        </Box>
        <Grid container xs={3}>
          <SelectMenu
            label="年齢"
            value={age}
            numbers={ages}
            onChange={onChangeAge}
          />
        </Grid>
      </FlexBox>
      <Box mb={2}>
        <AlignedTextFields
          leftLabel="姓"
          leftValue={lastName}
          leftPlaceholder="山田"
          rightLabel="名"
          rightValue={firstName}
          rightPlaceholder="太郎"
          onChangeLeftValue={onChangeLastName}
          onChangeRightValue={onChangeFirstName}
        />
      </Box>
      <Box textAlign="center" mb={2}>
        <TextField
          row={1}
          label="好きな遊び"
          value={favoritePlay}
          variant="outlined"
          isFullWidth={true}
          placeholder="おままごと"
          onChange={onChangeFavoritePlay}
        />
      </Box>
      <Box textAlign="center" mt={2}>
        <TextField
          row={1}
          label="好きな食べ物"
          value={favoriteFood}
          variant="outlined"
          isFullWidth={true}
          placeholder="餃子"
          onChange={onChangeFavoriteFood}
        />
      </Box>
    </>
  );
});

UpdateKid.displayName = 'UpdateKid';
