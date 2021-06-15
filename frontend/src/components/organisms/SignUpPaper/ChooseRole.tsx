import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup/RadioButtonGroup';
import { Box } from '@material-ui/core';
import { SelectMenu } from '../../atoms/SelectMenu/SelectMenu';

export type Props = {
  role: string | null;
  gender: number | null;
  numbers: Array<number>;
  daycareId: number | null;
  onChangeRole: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGender: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDaycareId: (e: React.ChangeEvent<{ value: unknown }>) => void;
};

export const ChooseRole: React.FC<Props> = (props) => {
  const {
    role,
    gender,
    numbers,
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
        <SelectMenu
          numbers={numbers}
          value={daycareId}
          label="保育園のID"
          onChange={onChangeDaycareId}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};
