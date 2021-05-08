import React from 'react';
import { DefaultLayout } from '../templates/DefaultLayout';
import { KidCard } from '../molecules/KidCard';

type Props = {
  kidName: string | null;
  age: number | null;
  onClick?: () => void;
};

export const ChooseKid: React.FC<Props> = (props) => {
  const { kidName, age, onClick } = props;

  return (
    <DefaultLayout>
      <p>お子様を選択してください</p>
      <KidCard kidName={kidName} age={age} onClick={onClick} />
    </DefaultLayout>
  );
};
