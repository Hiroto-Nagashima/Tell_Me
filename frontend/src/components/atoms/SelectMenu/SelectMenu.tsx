import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const MyFormControl = styled(FormControl)`
  margin: 2%;
  min-width: 120px;
`;

export type Props = {
  label: string;
  value: number | null;
  numbers: Array<number>;
  onChange: (e: ChangeEvent<{ value: unknown }>) => void;
};

export const SelectMenu: React.FC<Props> = (props) => {
  const { label, value, numbers, onChange } = props;

  return (
    <div>
      <MyFormControl>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={onChange}>
          {numbers.map((number) => {
            return (
              <MenuItem key={number - 1} value={number}>
                {number}
              </MenuItem>
            );
          })}
        </Select>
      </MyFormControl>
    </div>
  );
};
