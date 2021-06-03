import { Story, Meta } from '@storybook/react';
import { Header, Props } from './Header';

export default {
  title: 'organisms/Header',
  component: Header,
} as Meta;

const Template: Story<Props> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  title: 'Tell Me',
};
