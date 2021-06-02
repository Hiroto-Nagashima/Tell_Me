import React, { memo } from 'react';
import 'date-fns';
import ja from 'date-fns/locale/ja';
import format from 'date-fns/format';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, 'yyyy MMM', { locale: this.locale });
  }
  getDatePickerHeaderText(date: Date) {
    return format(date, 'MMMd日', { locale: this.locale });
  }
}

export type Props = {
  onChangeDate: (date: Date | null) => void;
  selectedDate: string | Date | null;
};

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  .MuiPickersToolbar-toolbar {
    background-color: lime;
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f25e5d',
    },
  },
});

export const DatePicker: React.FC<Props> = memo((props) => {
  const { onChangeDate, selectedDate } = props;

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider locale={ja} utils={ExtendedUtils}>
        <StyledKeyboardDatePicker
          margin="normal"
          id="date"
          label="日付選択"
          okLabel="決定"
          cancelLabel="キャンセル"
          format="yyyy/MM/dd"
          value={selectedDate}
          onChange={onChangeDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
});

DatePicker.displayName = 'DatePicker';
