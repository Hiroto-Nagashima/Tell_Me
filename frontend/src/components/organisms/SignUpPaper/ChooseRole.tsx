import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup/RadioButtonGroup';
import { SingleLineTextField } from '../../atoms';
import { Box } from '@material-ui/core';

export type Props = {
  role: string | null;
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
          row
          aria-label="gender"
          name="gender1"
          value={role}
          onChange={onChangeRole}
        >
          <Box mb={2}>
            <FormControlLabel
              value="保護者"
              control={<Radio />}
              label="私は保護者です"
            />
          </Box>
          <Box mb={2}>
            <FormControlLabel
              value="先生"
              control={<Radio />}
              label="私は先生です"
            />
          </Box>
        </RadioGroup>
      </FormControl>
      {role == '保護者' ? (
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
      {role == '先生' ? (
        <SingleLineTextField
          id="Daycare_ID"
          type="number"
          textName="Daycare_ID"
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
