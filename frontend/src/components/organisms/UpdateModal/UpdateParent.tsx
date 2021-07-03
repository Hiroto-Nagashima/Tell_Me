import React, { ChangeEvent, memo } from 'react';

import { Box } from '@material-ui/core';
import { TextField } from '../../atoms';
import { AlignedTextFields } from '../../molecules/AlignedTextFields/AlignedTextFields';

export type Props = {
  email: string;
  telephoneNumber: string;
  firstName: string | null;
  lastName: string | null;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTelephoneNumber: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UpdateParent: React.FC<Props> = memo((props) => {
  const {
    email,
    firstName,
    lastName,
    telephoneNumber,
    onChangeEmail,
    onChangeFirstName,
    onChangeLastName,
    onChangeTelephoneNumber,
  } = props;

  return (
    <div>
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
      <Box textAlign="center" m={4}>
        <TextField
          row={1}
          label="電話番号"
          value={telephoneNumber}
          variant="outlined"
          placeholder="090xxxxxxxx"
          isFullWidth={true}
          onChange={onChangeTelephoneNumber}
        />
      </Box>
      <Box textAlign="center" m={4}>
        <TextField
          row={1}
          label="メールアドレス"
          value={email}
          variant="outlined"
          placeholder="xxxx@gmail.com"
          isFullWidth={true}
          onChange={onChangeEmail}
        />
      </Box>
    </div>
  );
});

UpdateParent.displayName = 'UpdateParent';
