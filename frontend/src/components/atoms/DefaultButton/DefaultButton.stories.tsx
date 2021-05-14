import { Story, Meta } from '@storybook/react';
import { DefaultButton, Props } from './DefaultButton';

export default {
  title: 'atoms/DefaultButton',
  component: DefaultButton,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <DefaultButton {...args} />;

export const Small = Template.bind({});
Small.args = {
  color: 'inherit',
  label: 'Push!!!!',
  size: 'small',
  variant: 'contained',
};

export const Medium = Template.bind({});
Medium.args = {
  color: 'primary',
  label: 'Push!!!!',
  size: 'medium',
  variant: 'contained',
};

export const Large = Template.bind({});
Large.args = {
  color: 'secondary',
  label: 'Push!!!!',
  size: 'large',
  variant: 'contained',
};
