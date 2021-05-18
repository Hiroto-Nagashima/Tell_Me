import axios from 'axios';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Kid } from '../../types/api/kid';
import { CustomizedSnackbar, DefaultButton, Spinner } from '../atoms';
import { DatePicker } from '../molecules';
import { useParams } from 'react-router-dom';
import { InputOfNotebook } from '../organisms';
import format from 'date-fns/format';

export const Notebook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [notebookId, setNotebookID] = useState<number | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [message, setMassage] = useState('');
  const [severity, setSeverity] =
    useState<'error' | 'warning' | 'info' | 'success'>('error');
  const [kid, setKid] = useState<Kid | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dinner, setDinner] = useState<string | null>(null);
  const [breakfast, setBreakfast] = useState<string | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [bodyTemperature, setBodyTemperature] =
    useState<number | string | null>(null);
  const [hasBathed, setHasBathed] = useState<boolean | null>(null);

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

  const handleHasBathedChange = useCallback(() => {
    setHasBathed(!hasBathed);
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log(date);
  };

  const newDate = format(selectedDate!, 'yyyy/MM/dd');

  const fetchKid = async () =>
    await axios
      .get(`http://localhost:5000/api/v1/kids/${id}`)
      .then((res) => {
        setKid(res.data);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);

    return;
  };

  const onClickCheck = () => {
    setLoading(true);
    console.log(1);
    axios
      .get(
        `http://localhost:5000/api/v1/kids/${kid!.id}/notebooks/fetchNotebook`,
        {
          params: {
            date: selectedDate,
          },
        },
      )
      .then((res) => {
        if (res.data.dinner == null) {
          setIsUpdate(false);
          setDinner(res.data.dinner);
          setBreakfast(res.data.breakfast);
          setMemo(res.data.memo);
          setBodyTemperature(res.data.body_temperature);
          setHasBathed(res.data.has_bathed);
        } else {
          setIsUpdate(true);
          setNotebookID(res.data.id);
          setDinner(res.data.dinner);
          setBreakfast(res.data.breakfast);
          setMemo(res.data.memo);
          setBodyTemperature(res.data.body_temperature);
          setHasBathed(res.data.has_bathed);
        }
        setIsNotebookOpen(true);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const handleClickRegister = () => {
    if (isUpdate) {
      axios
        .put(
          `http://localhost:3000/api/v1/kids/${
            kid!.id
          }/notebooks/${notebookId}`,
          {
            notebook: {
              body_temperature: bodyTemperature,
              has_bathed: hasBathed,
              breakfast: breakfast,
              dinner: dinner,
              memo: memo,
              date: selectedDate,
            },
          },
        )
        .then((res) => {
          setSeverity('success');
          setMassage(res.data.message);
          setIsSnackbarOpen(true);
        })
        .catch((e) => {
          setSeverity('error');
          setMassage(e.data.message);
          setIsSnackbarOpen(true);
        });
    } else
      axios
        .post(`http://localhost:3000/api/v1/kids/${kid!.id}/notebooks`, {
          notebook: {
            body_temperature: bodyTemperature,
            has_bathed: hasBathed,
            breakfast: breakfast,
            dinner: dinner,
            memo: memo,
            date: selectedDate,
          },
        })
        .then((res) => {
          setSeverity('success');
          setMassage(res.data.message);
          setIsSnackbarOpen(true);
        })
        .catch((e) => {
          setSeverity('error');
          setMassage(e.data.message);
          setIsSnackbarOpen(true);
        });
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
          {isNotebookOpen ? (
            <InputOfNotebook
              memo={memo}
              hasBathed={hasBathed}
              dinner={dinner}
              breakfast={breakfast}
              bodyTemperature={bodyTemperature}
              onChangeMemo={handleMemoChange}
              onChangeHasBathed={handleHasBathedChange}
              onChangeBodyTemperature={handleBodyTemperatureChange}
              onChangeDinner={handleDinnerChange}
              onChangeBreakfast={handleBreakfastChange}
              selectedDate={newDate}
              onClick={handleClickRegister}
            />
          ) : (
            <div></div>
          )}
          <CustomizedSnackbar
            open={isSnackbarOpen}
            onClose={handleSnackbarClose}
            severity={severity}
          >
            {message}
          </CustomizedSnackbar>
        </>
      )}
    </>
  );
};
