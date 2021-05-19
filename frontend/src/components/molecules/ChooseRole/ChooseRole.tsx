import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { SingleLineTextField } from '../../atoms';

export type Props = {
  role: number | null;
  gender: number | null;
  daycareId: number | null;
  onChangeRole: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGender: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDaycareId: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const VerticalRadioButtonsGroup: React.FC<Props> = (props) => {
  const {
    role,
    gender,
    daycareId,
    onChangeRole,
    onChangeGender,
    onChangeDaycareId,
  } = props;

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={role}
          onChange={onChangeRole}
        >
          <FormControlLabel
            value={0}
            control={<Radio />}
            label="私は保護者です"
          />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="私は先生です"
          />
        </RadioGroup>
      </FormControl>
      {role == 0 ? (
        <RadioButtonGroup
          value={gender}
          firstLabel="私は母です"
          secondLabel="私は父です"
          firstValue={0}
          secondValue={1}
          onChange={onChangeGender}
        />
      ) : (
        <SingleLineTextField
          id="保育園のID"
          textName="保育園のID"
          placeholder="数字"
          isFullWidth={false}
          value={daycareId}
          onChange={onChangeDaycareId}
        />
      )}
    </>
  );
};
