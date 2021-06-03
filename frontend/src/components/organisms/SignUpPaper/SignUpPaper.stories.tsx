import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { SignUpPaper, Props } from './SignUpPaper';

export default {
  title: 'organisms/SignUpPaper',
  component: SignUpPaper,
  argTypes: {
    onClickSignUp: { action: 'onClick' },
    onChangeRole: { action: 'onChange' },
    onChangeDaycareId: { action: 'onChange' },
    onChangeGender: { action: 'onChange' },
    onChangeFirstName: { action: 'onChange' },
    onChangeLastName: { action: 'onChange' },
    onChangeEmail: { action: 'onChange' },
    onChangePassword: { action: 'onChange' },
    onChangeTelephoneNumber: { action: 'onChange' },
  },
} as Meta;

const Template: Story<Props> = (args) => {
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [daycareId, setDaycareId] = useState<number | null>(null);
  const [telephoneNumber, setTelephoneNumber] = useState('');

  return (
    <SignUpPaper
      {...args}
      onChangeRole={(e) => {
        args.onChangeRole(e);
        setRole(e.target.value);
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
      onChangeEmail={(e) => {
        args.onChangeEmail(e);
        setEmail(e.target.value);
      }}
      onChangePassword={(e) => {
        args.onChangePassword(e);
        setPassword(e.target.value);
      }}
      onChangeTelephoneNumber={(e) => {
        args.onChangeTelephoneNumber(e);
        setTelephoneNumber(e.target.value);
      }}
      role={role}
      email={email}
      gender={gender}
      password={password}
      lastName={lastName}
      daycareId={daycareId}
      firstName={firstName}
      telephoneNumber={telephoneNumber}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
