import { Story, Meta } from '@storybook/react';
import { LoginPaper, Props } from './LoginPaper';

export default {
  title: 'organisms/LoginPaper',
  component: LoginPaper,
} as Meta;

const Template: Story<Props> = (args) => <LoginPaper {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '連絡帳',
};
