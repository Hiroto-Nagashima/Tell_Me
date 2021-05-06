import { Story, Meta } from '@storybook/react';
import { Header, Props } from './Header';

export default {
  title: 'organisms/Header',
  component: Header,
  args: {
    kid: {
      name: '太郎',
      nursery_name: '第一保育園',
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  auth: true,
  color: 'inherit',
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  auth: false,
  color: 'inherit',
};
