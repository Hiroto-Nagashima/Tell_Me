import React, { ChangeEvent, memo } from 'react';
import styled from 'styled-components';

import { Box } from '@material-ui/core';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup/RadioButtonGroup';
import { SingleLineTextField } from '../../atoms/index';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

export type Props = {
  age: number | null;
  open: boolean;
  gender: number;
  disabled: boolean;
  firstName: string | null;
  lastName: string | null;
  favoriteFood: string | null;
  favoritePlay: string | null;
  onCloseModal: () => void;
  onClickSubmitFile: () => void;
  onClickSubmitProfile: () => void;
  onChangeAge: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFile: (et: ChangeEvent<HTMLInputElement>) => void;
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

  return (
    <>
      <Box m={4}>
        <RadioButtonGroup
          value={gender}
          firstValue={0}
          secondValue={1}
          onChange={onChangeGender}
          firstLabel="女の子"
          secondLabel="男の子"
        />
      </Box>
      <FlexBox>
        <Box textAlign="center" mr={1} mb={2}>
          <SingleLineTextField
            id="姓"
            isFullWidth={false}
            textName="姓"
            placeholder="山田"
            value={lastName}
            onChange={onChangeLastName}
          />
        </Box>
        <Box textAlign="center" ml={1}>
          <SingleLineTextField
            id="名"
            isFullWidth={false}
            textName="太郎"
            placeholder="空欄は入れないでください"
            value={firstName}
            onChange={onChangeFirstName}
          />
        </Box>
      </FlexBox>
      <Box mb={2}>
        <SingleLineTextField
          id="ご年齢"
          isFullWidth={false}
          textName="ご年齢"
          placeholder="数字のみ"
          value={age}
          onChange={onChangeAge}
        />
      </Box>
      <Box textAlign="center" mb={2}>
        <SingleLineTextField
          id="好きな食べ物"
          isFullWidth={true}
          textName="好きな食べ物"
          placeholder="餃子"
          value={favoriteFood}
          onChange={onChangeFavoriteFood}
        />
      </Box>
      <Box textAlign="center">
        <SingleLineTextField
          id="好きな食べ物"
          isFullWidth={true}
          textName="好きな遊び"
          placeholder="おままごと"
          value={favoritePlay}
          onChange={onChangeFavoritePlay}
        />
      </Box>
    </>
  );
});
UpdateKid.displayName = 'UpdateKid';
