import axios from 'axios';
import React, { useState } from 'react';
import { DefaultButton, Spinner } from '../atoms';
import { DatePicker } from '../molecules';

export const Notebook: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log(date);
  };

  const onClickCheck = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/kids/#{kid.id}/notebook`, {
        params: {
          date: selectedDate,
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>{error}</div>
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
            onClick={onClickCheck}
          />
        </>
      )}
    </>
  );
};
