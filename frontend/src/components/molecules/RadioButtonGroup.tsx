import React, { ChangeEvent } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { FormLabel } from '@material-ui/core';

type Props = {
  value: boolean | number | null;
  formLabel?: string;
  disabled?: boolean;
  firstValue: boolean | number | null;
  secondValue: boolean | number | null;
  firstLabel: string;
  secondLabel: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const RadioButtonGroup: React.FC<Props> = (props) => {
  const {
    value,
    disabled,
    formLabel,
    firstLabel,
    secondLabel,
    firstValue,
    secondValue,
    onChange,
  } = props;

  return (
    <FormControl component="fieldset" disabled={disabled}>
      <FormLabel component="legend">{formLabel}</FormLabel>
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
