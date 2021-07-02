import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

export type Props = {
  row: number;
  label: string;
  value?: string | null;
  variant: 'standard' | 'filled' | 'outlined';
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

// 列の指定ができるTextarea
export const MultipleLinesTextField: React.FC<Props> = (props) => {
  const { row, label, value, variant, disabled, onChange } = props;

  return (
    <TextField
      id="outlined-multiline-static"
      rows={row}
      label={label}
      style={{ width: '100%' }}
      value={value}
      variant={variant}
      disabled={disabled}
      multiline
      onChange={onChange}
    />
  );
};
