import React, { useState } from 'react';
import { DefaultButton, Spinner } from '../atoms';
import { DatePicker } from '../molecules';

export const Notebook: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>error</div>
      ) : (
        <>
          <div>日付を選択してください</div>
          <DatePicker
            onChangeDate={handleDateChange}
            selectedDate={selectedDate}
          />
          <DefaultButton
            variant="contained"
            color="primary"
            label="連絡帳を確認"
            size="medium"
          />
        </>
      )}
    </>
  );
};
