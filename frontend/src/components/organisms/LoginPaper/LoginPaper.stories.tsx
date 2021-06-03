import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoginPaper, Props } from './LoginPaper';

export default {
  title: 'organisms/LoginPaper',
  component: LoginPaper,
  argTypes: {
    onClickLogin: { action: 'onClick' },
    onChangeEmail: { action: 'onChange' },
    onChangePassword: { action: 'onChange' },
  },
} as Meta;

const Template: Story<Props> = (args) => {
  const [email, setEmail] = useState(args.email);
  const [password, setPassword] = useState(args.password);
  return (
    <BrowserRouter>
      <LoginPaper
        {...args}
        onChangeEmail={(e) => {
          args.onChangeEmail(e);
          setEmail(e.target.value);
        }}
        onChangePassword={(e) => {
          args.onChangePassword(e);
          setPassword(e.target.value);
        }}
        email={email}
        password={password}
      />
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {};
