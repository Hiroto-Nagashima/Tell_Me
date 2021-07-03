import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import format from 'date-fns/format';
import { useParams } from 'react-router-dom';

import { InputOfNotebook } from '../organisms';
import {
  CustomizedSnackbar,
  Spinner,
  DatePicker,
  StyledButton,
} from '../atoms';
import { useFetchKid } from '../../hooks/useFetchKid';
import { Box, Grid } from '@material-ui/core';
import { NotebookTemplate } from '../organisms/NotebookTemplate/NotebookTemplate';
import { NotebookTemplate as TypeOfNotebookTemplate } from '../../types/frontend/notebookTemplates';
import styled from 'styled-components';

const TemplateButton = styled(Grid)`
  margin: 5% 0;
`;

export const Notebook: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { getKid } = useFetchKid();

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [memo, setMemo] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [dinner, setDinner] = useState<string | null>(null);
  const [dinnerTemplate, setDinnerTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMassage] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [breakfast, setBreakfast] = useState<string | null>(null);
  const [breakfastTemplate, setBreakfastTemplate] = useState<string | null>(
    null,
  );
  const [hasBathed, setHasBathed] = useState<boolean>(true);
  const [hasBathedTemplate, setHasBathedTemplate] = useState<boolean>(true);
  const [notebookId, setNotebookID] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [displayOfTemplate, setDisplayOfTemplate] = React.useState('');
  const [displayOfButton, setDisplayOfButton] = React.useState('none');
  const [notebookTemplates, setNotebookTemplates] =
    useState<Array<TypeOfNotebookTemplate> | null>(null);

  const [severity, setSeverity] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('error');
  const [bodyTemperature, setBodyTemperature] = useState<string | null>(null);

  const newDate = format(
    selectedDate ? selectedDate : new Date(),
    'yyyy/MM/dd',
  );

  const onChangeDinner = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDinner(e.target.value);
  }, []);

  const onChangeBreakfast = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBreakfast(e.target.value);
  }, []);

  const onChangeMemo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  }, []);

  const onChangeBodyTemperature = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBodyTemperature(e.target.value);
    },
    [],
  );

  const onChangeHasBathed = () => {
    setHasBathed(!hasBathed);
  };

  const onChangeDinnerTemplate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDinnerTemplate(e.target.value);
    },
    [],
  );

  const onChangeBreakfastTemplate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBreakfastTemplate(e.target.value);
    },
    [],
  );

  const onChangeHasBathedTemplate = () => {
    setHasBathedTemplate(!hasBathedTemplate);
  };

  const onCloseSnackbar = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsSnackbarOpen(false);

      return;
    },
    [],
  );

  const onChangeDate = (date: Date | null) => {
    setLoading(true);
    axios
      .get(`${API_ENDPOINT}kids/${id}/notebooks/fetch_notebook`, {
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
        setSelectedDate(date);
        setMemo(res.data.memo);
        setDinner(res.data.dinner);
        setBreakfast(res.data.breakfast);
        setBodyTemperature(res.data.body_temperature);
        res.data.has_bathed == null
          ? setHasBathed(true)
          : setHasBathed(res.data.has_bathed);
        setIsNotebookOpen(true);
      })
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
        setDisplayOfTemplate('none');
        setDisplayOfButton('');
      });
  };

  const onClickRegisterNotebook = () => {
    setLoading(true);
    if (isUpdate) {
      axios
        .put(`${API_ENDPOINT}kids/${id}/notebooks/${notebookId}`, {
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
          if (res.data.status == '422') {
            setSeverity('error');
            setMassage(res.data.message);
          } else {
            setSeverity('success');
            setMassage(res.data.message);
          }
        })
        .catch(() => {
          setSeverity('error');
          setMassage('登録に失敗しました');
        })
        .finally(() => {
          setLoading(false);
          setIsSnackbarOpen(true);
        });
    } else
      axios
        .post(`${API_ENDPOINT}kids/${id}/notebooks`, {
          notebook: {
            memo: memo,
            date: selectedDate,
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
          setMassage('入力値に誤りがあります');
        })
        .finally(() => {
          setLoading(false);
          setIsSnackbarOpen(true);
        });
  };

  const onClickTemplateButton = (templateId: number) => {
    setLoading(true);
    axios
      .get(`${API_ENDPOINT}kids/${id}/notebook_templates/${templateId}`)
      .then((res) => {
        setDinner(res.data[0].dinner);
        setBreakfast(res.data[0].breakfast);
        setHasBathed(res.data[0].has_bathed);
      })
      .catch(() => setError('エラー'))
      .finally(() => {
        setLoading(false);
      });
  };

  const onClickRegisterTemplate = () => {
    setLoading(true);
    axios
      .post(`${API_ENDPOINT}kids/${id}/notebook_templates`, {
        notebook_template: {
          dinner: dinnerTemplate,
          breakfast: breakfastTemplate,
          has_bathed: hasBathedTemplate,
        },
      })
      .then((res) => {
        setSeverity('success');
        setMassage(res.data.message);
        setNotebookTemplates(res.data.notebook_templates);
      })
      .catch(() => {
        setSeverity('error');
        setMassage('入力値に誤りがあります');
      })
      .finally(() => {
        setLoading(false);
        setIsSnackbarOpen(true);
      });
  };

  const FetchNotebookTemplates = () => {
    setLoading(true);
    axios
      .get(`${API_ENDPOINT}kids/${id}/notebook_templates`)
      .then((res) => {
        setNotebookTemplates(res.data);
      })
      .catch(() => setError('エラー'))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getKid();
    FetchNotebookTemplates();
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
          <DatePicker selectedDate={selectedDate} onChangeDate={onChangeDate} />
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Box component="span" display={displayOfButton}>
              {notebookTemplates
                ? notebookTemplates.map((notebookTemplate, index) => {
                    return (
                      <TemplateButton item xs={12} key={notebookTemplate.id}>
                        <StyledButton
                          variant="contained"
                          label={`Template${index + 1}`}
                          fontSize={18}
                          width={100}
                          borderRadius={20}
                          onClick={() =>
                            onClickTemplateButton(notebookTemplate.id)
                          }
                        />
                      </TemplateButton>
                    );
                  })
                : null}
            </Box>
          </Grid>
          <Grid container justify="center">
            <Grid item md={6} sm={10} xs={12}>
              <Box component="span" display={displayOfTemplate}>
                <NotebookTemplate
                  dinner={dinnerTemplate}
                  hasBathed={hasBathedTemplate}
                  breakfast={breakfastTemplate}
                  onClickRegister={onClickRegisterTemplate}
                  onChangeDinner={onChangeDinnerTemplate}
                  onChangeBreakfast={onChangeBreakfastTemplate}
                  onChangeHasBathed={onChangeHasBathedTemplate}
                />
              </Box>
            </Grid>
            {isNotebookOpen ? (
              <Grid item sm={12} xs="auto">
                <InputOfNotebook
                  selectedDate={newDate}
                  memo={memo}
                  dinner={dinner}
                  hasBathed={hasBathed}
                  breakfast={breakfast}
                  bodyTemperature={bodyTemperature}
                  onClickRegister={onClickRegisterNotebook}
                  onChangeMemo={onChangeMemo}
                  onChangeDinner={onChangeDinner}
                  onChangeBreakfast={onChangeBreakfast}
                  onChangeHasBathed={onChangeHasBathed}
                  onChangeBodyTemperature={onChangeBodyTemperature}
                />
              </Grid>
            ) : (
              <div></div>
            )}
          </Grid>
          <CustomizedSnackbar
            open={isSnackbarOpen}
            severity={severity}
            onClose={onCloseSnackbar}
          >
            {message}
          </CustomizedSnackbar>
        </>
      )}
    </>
  );
};

Notebook.displayName = 'Notebook';
