import React, { ElementType, memo } from 'react';

import { Box } from '@material-ui/core';
import { RadioButtonGroup } from '../../atoms/RadioButtonGroup/RadioButtonGroup';

export type Props = {
  value: boolean | number | null;
  component: ElementType;
  mainLabel: string;
  firstLabel: string;
  secondLabel: string;
  firstValue: boolean | number | null;
  secondValue: boolean | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LabeledRadioButtonGroup: React.FC<Props> = memo((props) => {
  const {
    value,
    component,
    mainLabel,
    firstLabel,
    secondLabel,
    firstValue,
    secondValue,
    onChange,
  } = props;

  return (
    <>
      <Box component={component} px={4} my={4}>
        {mainLabel}
      </Box>
      <Box mx={4}>
        <RadioButtonGroup
          value={value}
          firstValue={firstValue}
          secondValue={secondValue}
          firstLabel={firstLabel}
          secondLabel={secondLabel}
          onChange={onChange}
        />
      </Box>
    </>
  );
});
LabeledRadioButtonGroup.displayName = 'LabeledRadioButtonGroup';
