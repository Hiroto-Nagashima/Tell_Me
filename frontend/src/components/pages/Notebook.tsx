import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Kid } from '../../types/api/kid';
import { DefaultButton, Spinner } from '../atoms';
import { DatePicker } from '../molecules';
import { useParams } from 'react-router-dom';

export const Notebook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [kid, setKid] = useState<Kid | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log(date);
  };
  const fetchKid = async () =>
    await axios
      .get(`http://localhost:5000/api/v1/kids/${id}`)
      .then((res) => {
        setKid(res.data);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));

  const onClickCheck = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/kids/${kid!.id}/notebooks`, {
        params: {
          date: selectedDate,
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchKid();
  }, []);

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
