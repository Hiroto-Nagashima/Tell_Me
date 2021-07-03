import React, { memo } from 'react';
import styled from 'styled-components';

import { Box } from '@material-ui/core';
import { TextField } from '../../atoms/index';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

export type Props = {
  leftValue: string | null;
  rightValue: string | null;
  leftLabel: string;
  rightLabel: string;
  leftPlaceholder: string;
  rightPlaceholder: string;
  onChangeLeftValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRightValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AlignedTextFields: React.FC<Props> = memo((props) => {
  const {
    leftValue,
    rightValue,
    leftLabel,
    rightLabel,
    leftPlaceholder,
    rightPlaceholder,
    onChangeLeftValue,
    onChangeRightValue,
  } = props;

  return (
    <FlexBox>
      <Box textAlign="center" ml={4} mr={1}>
        <TextField
          row={1}
          label={leftLabel}
          value={leftValue}
          variant="outlined"
          isFullWidth={false}
          placeholder={leftPlaceholder}
          onChange={onChangeLeftValue}
        />
      </Box>
      <Box textAlign="center" mr={4} ml={1}>
        <TextField
          row={1}
          label={rightLabel}
          value={rightValue}
          variant="outlined"
          isFullWidth={false}
          placeholder={rightPlaceholder}
          onChange={onChangeRightValue}
        />
      </Box>
    </FlexBox>
  );
});

AlignedTextFields.displayName = 'AlignedTextFields';
