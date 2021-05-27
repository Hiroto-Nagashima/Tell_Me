import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export type Props = {
  url?: string;
  label: string;
  width?: number;
  height?: number;
  fontSize?: number;
  borderRadius?: number;
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: (e: unknown) => void;
};

export const StyledButton: React.FC<Props> = (props) => {
  const {
    variant,
    width,
    height,
    fontSize,
    borderRadius,
    label,
    url,
    onClick,
  } = props;

  const SButton = styled(Button)`
    width: ${width}%;
    background: #ff9463;
    color: white;
    height: ${height}px;
    font-size: ${fontSize}px;
    border-radius: ${borderRadius}px;
    &:hover {
      background: #f25e5d;
    }
  `;

  return (
    <SButton variant={variant} href={url} onClick={onClick}>
      {label}
    </SButton>
  );
};
