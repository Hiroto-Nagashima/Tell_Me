import React, { VFC } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styled from 'styled-components';

export type Props = {
  id: string;
  textName: string;
  placeholder: string;
  isFullWidth: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number | string | null;
  type?: string;
};
const SFormControl = styled(FormControl)`
    display: grid
    step: "0.1"
  `;
export const SingleLineTextField: VFC<Props> = (props) => {
  const { isFullWidth, textName, placeholder, onChange, value, id, type } =
    props;

  return (
    <SFormControl variant="outlined" fullWidth={isFullWidth}>
      <InputLabel htmlFor="component-outlined">{textName}</InputLabel>
      <OutlinedInput
        style={{ width: '100%' }}
        id={id}
        value={value}
        onChange={onChange}
        label={textName}
        placeholder={placeholder}
        type={type}
      />
    </SFormControl>
  );
};
