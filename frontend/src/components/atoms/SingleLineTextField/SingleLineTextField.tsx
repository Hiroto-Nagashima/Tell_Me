import React, { VFC } from 'react';
import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { InputBaseComponentProps } from '@material-ui/core';

const MyFormControl = styled(FormControl)`
  display: grid;
`;

const MyOutlinedInput = styled(OutlinedInput)`
  width: 100%;
`;

export type Props = {
  id: string;
  type?: string;
  value?: number | string | null;
  disabled?: boolean;
  textName: string;
  inputProps?: InputBaseComponentProps;
  isFullWidth: boolean;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SingleLineTextField: VFC<Props> = (props) => {
  const {
    id,
    type,
    value,
    disabled,
    textName,
    inputProps,
    isFullWidth,
    placeholder,
    onChange,
  } = props;

  return (
    <MyFormControl variant="outlined" fullWidth={isFullWidth}>
      <InputLabel htmlFor="component-outlined">{textName}</InputLabel>
      <MyOutlinedInput
        id={id}
        type={type}
        label={textName}
        value={value}
        disabled={disabled}
        fullWidth={isFullWidth}
        inputProps={inputProps}
        placeholder={placeholder}
        onChange={onChange}
      />
    </MyFormControl>
  );
};
