import { Story, Meta } from '@storybook/react';
import { RegisterKidPaper, Props } from './RegisterKidPaper';

export default {
  title: 'organisms/RegisterKidPaper',
  component: RegisterKidPaper,
} as Meta;

const Template: Story<Props> = (args) => <RegisterKidPaper {...args} />;

export const Default = Template.bind({});
Default.args = {
};
