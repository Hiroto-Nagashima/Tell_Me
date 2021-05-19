import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export type Props = {
  value: number | null;
  onChange: () => void;
};

export const VerticalRadioButtonsGroup: React.FC = () => {
  const [role, setRole] = useState<number | null>(null);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = Number(e.target.value);
    setRole(targetValue);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={onChange}
      >
        <FormControlLabel
          value={0}
          control={<Radio />}
          label="私は保護者です"
        />
        <FormControlLabel value={1} control={<Radio />} label="私は先生です" />
      </RadioGroup>
    </FormControl>
  );
};
