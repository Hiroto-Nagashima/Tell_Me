import React, { useState } from 'react';
import { DatePicker } from '../molecules';

export const Notebook: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <>
      <div>Notebookページだよ</div>
      <DatePicker onChangeDate={handleDateChange} selectedDate={selectedDate} />
    </>
  );
};
