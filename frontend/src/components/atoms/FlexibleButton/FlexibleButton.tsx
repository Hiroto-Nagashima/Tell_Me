import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export type Props = {
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
  label: string;
  url?: string;
  onClick?: (e: unknown) => void;
};

const SButton = styled(Button)`
  width: 90%;
  background: #ff9463;
  color: white;
  height: 48px;
  &:hover {
    background: #f25e5d;
  }
`;
export const FlexibleButton: React.FC<Props> = (props) => {
  const { variant, color, label, url, onClick } = props;

  return (
    <SButton variant={variant} color={color} href={url} onClick={onClick}>
      {label}
    </SButton>
  );
};
