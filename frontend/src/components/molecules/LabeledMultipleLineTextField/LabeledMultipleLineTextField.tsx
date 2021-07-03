import React, { ElementType, memo } from 'react';

import { Box } from '@material-ui/core';
import { TextField } from '../../atoms/index';

export type Props = {
  row: number;
  value: string;
  component: ElementType;
  mainLabel: string;
  inputLabel: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LabeledMultipleLineTextField: React.FC<Props> = memo((props) => {
  const { row, value, component, mainLabel, inputLabel, onChange } = props;

  return (
    <>
      <Box component={component} px={4} my={4}>
        {mainLabel}
      </Box>
      <Box textAlign="center" mx={4}>
        <TextField
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
