import React, { ChangeEvent, useCallback, useState } from 'react';
import axios from 'axios';
import format from 'date-fns/format';
import { DatePicker } from '../molecules';
import { useParams } from 'react-router-dom';
import { InputOfNotebook } from '../organisms';
import { CustomizedSnackbar, Spinner } from '../atoms';

export const Notebook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [memo, setMemo] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [dinner, setDinner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMassage] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [breakfast, setBreakfast] = useState<string | null>(null);
  const [hasBathed, setHasBathed] = useState<boolean>(true);
  const [notebookId, setNotebookID] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [severity, setSeverity] =
    useState<'error' | 'warning' | 'info' | 'success'>('error');
  const [bodyTemperature, setBodyTemperature] =
    useState<number | string | null>(null);

  const newDate = format(selectedDate!, 'yyyy/MM/dd');

  const handleDinnerChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDinner(e.target.value);
  }, []);

  const handleBreakfastChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBreakfast(e.target.value);
    },
    [],
  );

  const handleMemoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  }, []);

  const handleBodyTemperatureChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBodyTemperature(e.target.value);
    },
    [],
  );

  const handleHasBathedChange = () => {
    setHasBathed(!hasBathed);
    console.log('hey');
    console.log(hasBathed);
  };

  const handleSnackbarClose = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsSnackbarOpen(false);

      return;
    },
    [],
  );

  const handleDateChange = (date: Date | null) => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/kids/${id}/notebooks/fetchNotebook`, {
        params: {
          date,
        },
      })
      .then((res) => {
        if (res.data.id == null) {
          setIsUpdate(false);
        } else {
          setIsUpdate(true);
          setNotebookID(res.data.id);
        }
        setMemo(res.data.memo);
        setDinner(res.data.dinner);
        setHasBathed(true);
        setBreakfast(res.data.breakfast);
        setBodyTemperature(res.data.body_temperature);
        setSelectedDate(date);
        setIsNotebookOpen(true);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const handleClickRegister = () => {
    setLoading(true);
    if (isUpdate) {
      axios
        .put(
          `http://localhost:5000/api/v1/kids/${id}/notebooks/${notebookId}`,
          {
            notebook: {
              date: selectedDate,
              memo: memo,
              dinner: dinner,
              breakfast: breakfast,
              has_bathed: hasBathed,
              body_temperature: bodyTemperature,
            },
          },
        )
        .then((res) => {
          setSeverity('success');
          setMassage(res.data.message);
        })
        .catch((e) => {
          setSeverity('error');
          setMassage(e.data.message);
        })
        .finally(() => {
          setLoading(false);
          setIsSnackbarOpen(true);
        });
    } else
      axios
        .post(`http://localhost:5000/api/v1/kids/${id}/notebooks`, {
          notebook: {
            date: selectedDate,
            memo: memo,
            dinner: dinner,
            breakfast: breakfast,
            has_bathed: hasBathed,
            body_temperature: bodyTemperature,
          },
        })
        .then((res) => {
          setSeverity('success');
          setMassage(res.data.message);
        })
        .catch(() => {
          setSeverity('error');
          setMassage('登録に失敗しました');
        })
        .finally(() => {
          setLoading(false);
          setIsSnackbarOpen(true);
        });
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
            selectedDate={selectedDate}
            onChangeDate={handleDateChange}
          />
          {isNotebookOpen ? (
            <InputOfNotebook
              selectedDate={newDate}
              memo={memo}
              dinner={dinner}
              hasBathed={hasBathed}
              breakfast={breakfast}
              bodyTemperature={bodyTemperature}
              onClick={handleClickRegister}
              onChangeMemo={handleMemoChange}
              onChangeDinner={handleDinnerChange}
              onChangeBreakfast={handleBreakfastChange}
              onChangeHasBathed={handleHasBathedChange}
              onChangeBodyTemperature={handleBodyTemperatureChange}
            />
          ) : (
            <div></div>
          )}
          <CustomizedSnackbar
            open={isSnackbarOpen}
            severity={severity}
            onClose={handleSnackbarClose}
          >
            {message}
          </CustomizedSnackbar>
          <button onClick={() => console.log(hasBathed)} />
        </>
      )}
    </>
  );
};
