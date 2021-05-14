import React from 'react';
import styled from 'styled-components';

export type Props = {
  addressOfDaycare: string;
  telephoneNumberOfDaycare: string;
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
  const { addressOfDaycare, telephoneNumberOfDaycare } = props;

  return (
    <SFooter>
      <div>{addressOfDaycare}</div>
      <div>{telephoneNumberOfDaycare}</div>
    </SFooter>
  );
};
