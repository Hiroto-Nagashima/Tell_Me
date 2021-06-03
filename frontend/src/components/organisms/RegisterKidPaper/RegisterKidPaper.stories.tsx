import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { RegisterKidPaper, Props } from './RegisterKidPaper';

export default {
  title: 'organisms/RegisterKidPaper',
  component: RegisterKidPaper,
  argTypes: {
    onClickRegister: { action: 'onClick' },
    onChangeAge: { action: 'onChange' },
    onChangeDaycareId: { action: 'onChange' },
    onChangeGender: { action: 'onChange' },
    onChangeFirstName: { action: 'onChange' },
    onChangeLastName: { action: 'onChange' },
    onChangeFavoritePlay: { action: 'onChange' },
    onChangeFavoriteFood: { action: 'onChange' },
  },
} as Meta;

const Template: Story<Props> = (args) => {
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState(0);
  const [lastName, setLastName] = useState<string | null>('');
  const [firstName, setFirstName] = useState<string | null>('');
  const [favoriteFood, setFavoriteFood] = useState<string | null>('');
  const [favoritePlay, setFavoritePlay] = useState<string | null>('');
  const [daycareId, setDaycareId] = useState<number | null>(null);
  return (
    <RegisterKidPaper
      {...args}
      onChangeAge={(e) => {
        args.onChangeAge(e);
        setAge(Number(e.target.value));
      }}
      onChangeGender={(e) => {
        args.onChangeGender(e);
        setGender(Number(e.target.value));
      }}
      onChangeDaycareId={(e) => {
        args.onChangeDaycareId(e);
        setDaycareId(Number(e.target.value));
      }}
      onChangeLastName={(e) => {
        args.onChangeLastName(e);
        setLastName(e.target.value);
      }}
      onChangeFirstName={(e) => {
        args.onChangeFirstName(e);
        setFirstName(e.target.value);
      }}
      onChangeFavoriteFood={(e) => {
        args.onChangeFavoriteFood(e);
        setFavoriteFood(e.target.value);
      }}
      onChangeFavoritePlay={(e) => {
        args.onChangeFavoritePlay(e);
        setFavoritePlay(e.target.value);
      }}
      age={age}
      gender={gender}
      lastName={lastName}
      firstName={firstName}
      favoriteFood={favoriteFood}
      favoritePlay={favoritePlay}
      daycareId={daycareId}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  parentLastName: '前田',
  parentFirstName: '健太',
};
