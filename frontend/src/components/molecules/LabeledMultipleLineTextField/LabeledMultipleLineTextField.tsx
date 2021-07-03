import React, { memo } from 'react';

import { Box } from '@material-ui/core';
import { MultipleLinesTextField } from '../../atoms/index';

export type Props = {
  row: number;
  value: string;
  mainLabel: string;
  inputLabel: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LabeledMultipleLineTextField: React.FC<Props> = memo((props) => {
  const { row, value, mainLabel, inputLabel, onChange } = props;

  return (
    <>
      <Box component="h3" px={4} my={4}>
        {mainLabel}
      </Box>
      <Box textAlign="center" mx={4}>
        <MultipleLinesTextField
          row={row}
          label={inputLabel}
          value={value}
          variant="outlined"
          onChange={onChange}
        />
      </Box>
    </>
  );
});
LabeledMultipleLineTextField.displayName = 'LabeledMultipleLineTextField';
