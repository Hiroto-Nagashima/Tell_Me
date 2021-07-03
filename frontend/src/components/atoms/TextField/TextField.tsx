import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import MaterialUITextField from '@material-ui/core/TextField';

const MyTextField = styled(MaterialUITextField)`
  width: 100%;
`;

export type Props = {
  row: number;
  label: string;
  value?: string | null;
  variant: 'standard' | 'filled' | 'outlined';
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const TextField: React.FC<Props> = (props) => {
  const { row, label, value, variant, disabled, onChange } = props;

  return (
    <MyTextField
      rows={row}
      label={label}
      value={value}
      variant={variant}
      disabled={disabled}
      multiline
      onChange={onChange}
    />
  );
};
