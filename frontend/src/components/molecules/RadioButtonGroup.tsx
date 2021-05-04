import React, { ChangeEvent } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

type Props = {
  value: 0 | 1 | null;
  firstLabel: string;
  secondLabel: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const RadioButtonGroup: React.FC<Props> = (props) => {
  const { value, firstLabel, secondLabel, onChange } = props;

  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="position"
        name="position"
        defaultValue={0}
        value={value}
        onChange={onChange}
      >
        <FormControlLabel
          value={0}
          control={<Radio color="primary" />}
          label={firstLabel}
        />
        <FormControlLabel
          value={1}
          control={<Radio color="primary" />}
          label={secondLabel}
        />
      </RadioGroup>
    </FormControl>
  );
};
