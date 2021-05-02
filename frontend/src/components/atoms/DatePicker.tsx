import React from 'react';
import 'date-fns';
import ja from 'date-fns/locale/ja';
import format from 'date-fns/format';
import DateFnsUtils from '@date-io/date-fns';
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

export type Props = {
  onChangeDate: (date: Date | null) => void;
  selectedDate: string | Date | null;
};

export const DatePicker: React.FC<Props> = (props) => {
  const { onChangeDate, selectedDate } = props;

  return (
    <MuiPickersUtilsProvider locale={ja} utils={ExtendedUtils}>
      <KeyboardDatePicker
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
  );
};
