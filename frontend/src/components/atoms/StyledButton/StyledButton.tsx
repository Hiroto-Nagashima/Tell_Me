import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export type Props = {
  url?: string;
  label: string;
  width?: number;
  height?: number;
  disabled?: boolean;
  fontSize?: number;
  borderRadius?: number;
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: (e: unknown) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
};

export const StyledButton: React.FC<Props> = (props) => {
  const {
    variant,
    width,
    height,
    fontSize,
    borderRadius,
    label,
    disabled,
    url,
    onClick,
    onSubmit,
  } = props;

  const SButton = styled(Button)`
    font-size: ${fontSize}px;
    border-radius: ${borderRadius}px;
    width: ${width}%;
    background: #ff9463;
    color: white;
    height: ${height}px;
    &:hover {
      background: #f25e5d;
    }
  `;

  return (
    <SButton
      variant={variant}
      href={url}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {label}
    </SButton>
  );
};
