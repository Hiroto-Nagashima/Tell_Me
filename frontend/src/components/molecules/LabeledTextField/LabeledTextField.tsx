import React, { ElementType, memo } from 'react';

import { Box, InputBaseComponentProps } from '@material-ui/core';
import { TextField } from '../../atoms/index';

export type Props = {
  row: number;
  type?: string;
  value: string | number | null;
  disabled?: boolean;
  component: ElementType;
  mainLabel: string;
  multiline?: boolean;
  inputLabel: string;
  inputProps?: InputBaseComponentProps;
  isFullWidth?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LabeledTextField: React.FC<Props> = memo((props) => {
  const {
    row,
    type,
    value,
    disabled,
    component,
    mainLabel,
    multiline,
    inputLabel,
    inputProps,
    isFullWidth,
    placeholder,
    onChange,
  } = props;

  return (
    <>
      <Box component={component} px={4} my={4}>
        {mainLabel}
      </Box>
      <Box textAlign="center" mx={4}>
        <TextField
          row={row}
          type={type}
          label={inputLabel}
          value={value}
          variant="outlined"
          disabled={disabled}
          multiline={multiline}
          inputProps={inputProps}
          isFullWidth={isFullWidth}
          placeholder={placeholder}
          onChange={onChange}
        />
      </Box>
    </>
  );
});
LabeledTextField.displayName = 'LabeledTextField';
