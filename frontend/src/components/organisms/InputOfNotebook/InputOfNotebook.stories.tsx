import { Story, Meta } from '@storybook/react';
import { InputOfNotebook, Props } from './InputOfNotebook';

export default {
  title: 'organisms/InputOfNotebook',
  component: InputOfNotebook,
} as Meta;

const Template: Story<Props> = (args) => <InputOfNotebook {...args} />;

export const Default = Template.bind({});
Default.args = {
};
