import { Story, Meta } from '@storybook/react';
import { DatePicker, Props } from './DatePicker';
import { useState } from 'react';

export default {
  title: 'molecules/DatePickers',
  component: DatePicker,
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

export const ActualMovement: Story<Props> = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <DatePicker onChangeDate={handleDateChange} selectedDate={selectedDate} />
  );
};
