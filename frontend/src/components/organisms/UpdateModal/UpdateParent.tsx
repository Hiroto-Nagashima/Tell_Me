import React, { ChangeEvent, memo } from 'react';
import styled from 'styled-components';

import { Box } from '@material-ui/core';
import { TextField } from '../../atoms/index';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

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
