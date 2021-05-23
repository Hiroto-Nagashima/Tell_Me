import { Story, Meta } from '@storybook/react';
import { SimplePopover } from './SimplePopover';

export default {
  title: 'Molecules/SimplePopover',
  component: SimplePopover,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <SimplePopover {...args} />;

export const Default = Template.bind({});
Default.args = {};
