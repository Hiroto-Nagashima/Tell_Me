import { Story, Meta } from '@storybook/react';
import { SignupPaper, Props } from './SignupPaper';

export default {
  title: 'organisms/SignupPaper',
  component: SignupPaper,
} as Meta;

const Template: Story<Props> = (args) => <SignupPaper {...args} />;

export const Default = Template.bind({});
Default.args = {
};
