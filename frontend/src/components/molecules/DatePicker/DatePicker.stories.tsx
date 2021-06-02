import { Story, Meta } from '@storybook/react';
import { DatePicker, Props } from './DatePicker';

export default {
  title: 'molecules/DatePickers',
  component: DatePicker,
  argTypes: { onChangeDate: { action: 'clicked' } },
  decorators: [
    (Story) => {
      return (
        <div style={{ margin: '3em' }}>
          <Story />
        </div>
      );
    },
  ],
} as Meta;

const Template: Story<Props> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {};
