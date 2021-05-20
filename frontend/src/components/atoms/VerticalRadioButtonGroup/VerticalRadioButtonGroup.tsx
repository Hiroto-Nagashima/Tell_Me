import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export type Props = {
  role: number | null;
  onChangeRole: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const VerticalRadioButtonsGroup: React.FC<Props> = (props) => {
  const { role, onChangeRole } = props;

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="role"
        name="role"
        value={role}
        onChange={onChangeRole}
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
