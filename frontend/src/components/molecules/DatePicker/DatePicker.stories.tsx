import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
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


const Template: Story<Props> = (args) => {
  const [selectedDate, setSelectedDate] = useState(args.selectedDate);
  return (
    <DatePicker
      {...args}
      onChangeDate={(e) => {
        args.onChangeDate(e);
        setSelectedDate(e);
      }}
      selectedDate={selectedDate}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
