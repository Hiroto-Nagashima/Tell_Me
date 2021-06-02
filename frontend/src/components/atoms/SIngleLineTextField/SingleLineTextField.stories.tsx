import { Story, Meta } from '@storybook/react';
import { Props, SingleLineTextField } from './SingleLineTextField';

export default {
  title: 'atoms/SingleLineTextField',
  component: SingleLineTextField,
} as Meta;

const Template: Story<Props> = (args) => <SingleLineTextField {...args} />;

export const Email = Template.bind({});
Email.args = {
  id: 'email',
  textName: 'メールアドレス',
  placeholder: 'xxx@gmail.com',
  isFullWidth: true,
};

export const Password = Template.bind({});
Password.args = {
  id: 'password',
  textName: 'パスワード',
  placeholder: '六文字以上',
  isFullWidth: false,
};

export const BodyTemperature = Template.bind({});
BodyTemperature.args = {
  id: 'bodyTemperature',
  type: 'number',
  textName: '体温',
  placeholder: '36.x',
  isFullWidth: false,
  inputProps: { min: 36.0, step: '0.1' },
};

export const Age = Template.bind({});
Age.args = {
  id: 'age',
  type: 'number',
  textName: '年齢',
  placeholder: 'x才',
  isFullWidth: false,
};
