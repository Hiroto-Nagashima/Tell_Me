import { Story, Meta } from '@storybook/react';
import { DatePicker, Props } from './DatePicker';

export default {
  title: 'atoms/DatePickers',
  component: DatePicker,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {};
