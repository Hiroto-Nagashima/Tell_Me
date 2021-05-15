import { Story, Meta } from '@storybook/react';
import { Props, DraggableDialog } from './DraggableDialog';

export default {
  title: 'Molecules/DraggableDialog',
  component: DraggableDialog,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <DraggableDialog {...args} />;

export const Closed = Template.bind({});
Closed.args = {};

export const Opened = Template.bind({});
Opened.args = {};
