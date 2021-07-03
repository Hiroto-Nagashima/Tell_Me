import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import MaterialUITextField from '@material-ui/core/TextField';
import { InputBaseComponentProps } from '@material-ui/core';

const MyTextField = styled(MaterialUITextField)`
  width: 100%;
`;

export type Props = {
  row: number;
  type?: string;
  label: string;
  value?: string | number | null;
  variant: 'standard' | 'filled' | 'outlined';
  disabled?: boolean;
  multiline?: boolean;
  inputProps?: InputBaseComponentProps;
  isFullWidth?: boolean;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const TextField: React.FC<Props> = (props) => {
  const {
    row,
    type,
    label,
    value,
    variant,
    disabled,
    multiline,
    inputProps,
    isFullWidth,
    placeholder,
    onChange,
  } = props;

  return (
    <MyTextField
      rows={row}
      type={type}
      label={label}
      value={value}
      variant={variant}
      disabled={disabled}
      fullWidth={isFullWidth}
      inputProps={inputProps}
      placeholder={placeholder}
      multiline={multiline}
      onChange={onChange}
    />
  );
};
