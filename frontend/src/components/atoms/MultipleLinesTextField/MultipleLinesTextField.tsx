import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

export type Props = {
  label: string;
  row: number;
  value?: string | null;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

// 列の指定ができるTextarea
export const MultipleLinesTextField: React.FC<Props> = (props) => {
  const { label, row, value, disabled, onChange } = props;

  return (
    <TextField
      id="outlined-multiline-static"
      value={value}
      onChange={onChange}
      label={label}
      multiline
      rows={row}
      variant="outlined"
      style={{ width: '100%' }}
      disabled={disabled}
    />
  );
};
