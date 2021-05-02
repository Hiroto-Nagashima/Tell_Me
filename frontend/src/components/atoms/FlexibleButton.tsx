import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export type Props = {
  variant: 'text' | 'outlined' | 'contained';
  color: 'inherit' | 'primary' | 'secondary' | 'default';
  label: string;
  url?: string;
  onClick?: () => void;
};

const SButton = styled(Button)`
  width: 90%;
`;
export const MyButton: React.FC<Props> = (props) => {
  const { variant, color, label, url, onClick } = props;

  return (
    <SButton variant={variant} color={color} href={url}    onClick={onClick}>
      {label}
    </SButton>
  );
};
