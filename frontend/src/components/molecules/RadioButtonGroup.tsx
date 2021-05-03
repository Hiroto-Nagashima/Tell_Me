import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export const RadioButtonGroup: React.FC = () => {
  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          value={0}
          control={<Radio color="primary" />}
          label="母"
        />
        <FormControlLabel
          value={1}
          control={<Radio color="primary" />}
          label="父"
        />
      </RadioGroup>
    </FormControl>
  );
};
