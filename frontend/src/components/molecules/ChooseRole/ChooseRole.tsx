import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { SingleLineTextField } from '../../atoms';
import { Box } from '@material-ui/core';

export type Props = {
  role: number | null;
  gender: number | null;
  daycareId: number | null;
  onChangeRole: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGender: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDaycareId: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ChooseRole: React.FC<Props> = (props) => {
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
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={role}
          onChange={onChangeRole}
        >
          <Box mb={2}>
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="私は保護者です"
            />
          </Box>
          <Box mb={2}>
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="私は先生です"
            />
          </Box>
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
        <div></div>
      )}
      {role == 1 ? (
        <SingleLineTextField
          id="保育園のID"
          type="number"
          textName="保育園のID"
          placeholder="数字"
          isFullWidth={false}
          value={daycareId}
          onChange={onChangeDaycareId}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};
