import React, { ChangeEvent, memo } from 'react';
import styled from 'styled-components';

import { Box, Grid } from '@material-ui/core';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup/RadioButtonGroup';
import { SelectMenu, TextField } from '../../atoms/index';

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
      <FlexBox my={2}>
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
      <FlexBox>
        <Box textAlign="center" mr={1} mb={2}>
          <TextField
            row={1}
            label="姓"
            value={lastName}
            variant="outlined"
            placeholder="山田"
            onChange={onChangeLastName}
          />
        </Box>
        <Box textAlign="center" ml={1}>
          <TextField
            row={1}
            label="名"
            value={firstName}
            variant="outlined"
            placeholder="太郎"
            onChange={onChangeFirstName}
          />
        </Box>
      </FlexBox>
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
      <Box textAlign="center">
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
