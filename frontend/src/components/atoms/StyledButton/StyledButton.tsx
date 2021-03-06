import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

export type Props = {
  url?: string;
  label: string;
  width?: number;
  height?: number;
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  fontSize?: number;
  borderRadius?: number;
  onClick?: (e: unknown) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
};

export const StyledButton: React.FC<Props> = (props) => {
  const {
    url,
    label,
    width,
    height,
    variant,
    disabled,
    fontSize,
    borderRadius,
    onClick,
    onSubmit,
  } = props;

  const MyButton = styled(Button)`
    color: white;
    width: ${width}%;
    height: ${height}px;
    font-size: ${fontSize}px;
    background: #ff9463;
    border-radius: ${borderRadius}px;
    &:hover {
      background: #f25e5d;
    }
  `;

  return (
    <MyButton
      href={url}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {label}
    </MyButton>
  );
};
