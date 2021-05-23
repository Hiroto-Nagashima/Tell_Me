import { Story, Meta } from '@storybook/react';
import { ParentPopover } from './ParentPopover';

export default {
  title: 'Molecules/ParentPopover',
  component: ParentPopover,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <ParentPopover {...args} />;

export const Default = Template.bind({});
Default.args = {};
