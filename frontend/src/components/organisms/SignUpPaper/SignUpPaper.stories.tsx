import { Story, Meta } from '@storybook/react';
import { SignUpPaper, Props } from './SignUpPaper';

export default {
  title: 'organisms/SignUpPaper',
  component: SignUpPaper,
} as Meta;

const Template: Story<Props> = (args) => <SignUpPaper {...args} />;

export const Default = Template.bind({});
Default.args = {
};
