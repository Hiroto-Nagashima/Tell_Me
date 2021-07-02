import React, { VFC } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styled from 'styled-components';
import { InputBaseComponentProps } from '@material-ui/core';

export type Props = {
  id: string;
  textName: string;
  placeholder: string;
  isFullWidth: boolean;
  type?: string;
  value?: number | string | null;
  disabled?: boolean;
  inputProps?: InputBaseComponentProps;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const MyFormControl = styled(FormControl)`
  display: grid;
`;
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
      <OutlinedInput
        id={id}
        type={type}
        label={textName}
        style={{ width: '100%' }}
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
