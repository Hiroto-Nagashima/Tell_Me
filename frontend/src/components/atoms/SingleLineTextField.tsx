import React, { VFC } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styled from 'styled-components';

export type Props = {
  textName: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number | string | null;
};
export const SingleLineTextField: VFC<Props> = (props) => {
  const { textName, placeholder, onChange, value } = props;
  const SFormControl = styled(FormControl)`
    display: grid
    step: "0.1"
  `;

  return (
    <SFormControl variant="outlined">
      <InputLabel htmlFor="component-outlined">{textName}</InputLabel>
      <OutlinedInput
        style={{ width: '100%' }}
        id="component-outlined"
        value={value}
        onChange={onChange}
        label={textName}
        placeholder={placeholder}
      />
    </SFormControl>
  );
};
