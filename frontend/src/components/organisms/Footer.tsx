import React from 'react';
import styled from 'styled-components';

export type Props = {
  label: string;
};
const SFooter = styled.footer`
  background-color: #3f51b5;
  color: #fff;
  text-align: center;
  padding: 8px 0px;
  position: fixed;
  bottom: 0;
  width: 100%;
`;
export const Footer: React.FC<Props> = (props) => {
  const { label } = props;

  return <SFooter>{label}</SFooter>;
};
