import React, { ChangeEvent, memo } from 'react';
import styled from 'styled-components';

import { Box } from '@material-ui/core';
import { SingleLineTextField } from '../../atoms/index';

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
            textName="名"
            placeholder="太郎"
            value={firstName}
            onChange={onChangeFirstName}
          />
        </Box>
      </FlexBox>
      <Box textAlign="center" m={4}>
        <SingleLineTextField
          id="電話番号"
          isFullWidth={true}
          textName="電話番号"
          placeholder="090xxxxxxxx"
          value={telephoneNumber}
          onChange={onChangeTelephoneNumber}
        />
      </Box>
      <Box textAlign="center" m={4}>
        <SingleLineTextField
          id="メールアドレス"
          isFullWidth={true}
          textName="メールアドレス"
          placeholder="xxxx@gmail.com"
          value={email}
          onChange={onChangeEmail}
        />
      </Box>
    </div>
  );
});

UpdateParent.displayName = 'UpdateParent';
