import React, { ChangeEvent } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

type Props = {
  value: boolean | number | null;
  firstValue: boolean | number | null;
  secondValue: boolean | number | null;
  firstLabel: string;
  secondLabel: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const RadioButtonGroup: React.FC<Props> = (props) => {
  const { value, firstLabel, secondLabel, firstValue, secondValue, onChange } =
    props;

  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="position"
        name="position"
        defaultValue="true"
        value={value}
        onChange={onChange}
      >
        <FormControlLabel
          value={firstValue}
          control={<Radio color="primary" />}
          label={firstLabel}
        />
        <FormControlLabel
          value={secondValue}
          control={<Radio color="primary" />}
          label={secondLabel}
        />
      </RadioGroup>
    </FormControl>
  );
};
