import React, { VFC } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styled from 'styled-components';
import { InputBaseComponentProps } from '@material-ui/core';

export type Props = {
  id: string;
  textName: string;
  inputProps?: InputBaseComponentProps;
  placeholder: string;
  isFullWidth: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number | string | null;
  type?: string;
  disabled?: boolean;
};
const SFormControl = styled(FormControl)`
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
    placeholder,
    isFullWidth,
    onChange,
  } = props;

  return (
    <SFormControl variant="outlined" fullWidth={isFullWidth}>
      <InputLabel htmlFor="component-outlined">{textName}</InputLabel>
      <OutlinedInput
        id={id}
        type={type}
        label={textName}
        value={value}
        style={{ width: '100%' }}
        disabled={disabled}
        inputProps={inputProps}
        placeholder={placeholder}
        onChange={onChange}
      />
    </SFormControl>
  );
};
