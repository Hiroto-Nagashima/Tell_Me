import React, { memo } from 'react';
import 'date-fns';
import ja from 'date-fns/locale/ja';
import format from 'date-fns/format';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, 'yyyy MMM', { locale: this.locale });
  }
  getDatePickerHeaderText(date: Date) {
    return format(date, 'MMMd日', { locale: this.locale });
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f25e5d',
    },
  },
});

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  .MuiPickersToolbar-toolbar {
    background-color: lime;
  }
`;

export type Props = {
  selectedDate: string | Date | null;
  onChangeDate: (date: Date | null) => void;
};

export const DatePicker: React.FC<Props> = memo((props) => {
  const { selectedDate, onChangeDate } = props;

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider locale={ja} utils={ExtendedUtils}>
        <StyledKeyboardDatePicker
          id="date"
          label="日付選択"
          value={selectedDate}
          format="yyyy/MM/dd"
          margin="normal"
          okLabel="決定"
          cancelLabel="キャンセル"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          onChange={onChangeDate}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
});

DatePicker.displayName = 'DatePicker';
