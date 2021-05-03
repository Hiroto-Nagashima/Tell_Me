import { Story, Meta } from '@storybook/react';
import { Spinner, Props } from './Spinner';

export default {
  title: 'atoms/Spinner',
  component: Spinner,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <Spinner {...args} />;

export const Inherit = Template.bind({});
Inherit.args = {
  color: 'inherit',
};

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
};
