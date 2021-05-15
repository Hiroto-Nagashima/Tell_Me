import { Story, Meta } from '@storybook/react';
import { ParentProfile, Props } from './ParentProfile';

export default {
  title: 'organisms/ParentProfile',
  component: ParentProfile,
} as Meta;

const Template: Story<Props> = (args) => <ParentProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  firstName: '道夫',
  lastName: '鈴木',
  email: 'suzukimichio@gmail.com',
  telephoneNumber: '08012345678',
};
