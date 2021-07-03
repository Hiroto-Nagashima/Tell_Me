import React, { memo } from 'react';

import { Box, Grid } from '@material-ui/core';
import { SelectMenu } from '../../atoms/index';

export type Props = {
  value: number | null;
  numbers: number[];
  mainLabel: string;
  menuLabel: string;
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
};

export const LabeledSelectMenu: React.FC<Props> = memo((props) => {
  const { value, numbers, mainLabel, menuLabel, onChange } = props;

  return (
    <>
      <Box component="h3" px={4} my={4}>
        {mainLabel}
      </Box>
      <Box textAlign="center" mx={4}>
        <Grid container xs={4}>
          <SelectMenu
            value={value}
            label={menuLabel}
            numbers={numbers}
            onChange={onChange}
          />
        </Grid>
      </Box>
    </>
  );
});

LabeledSelectMenu.displayName = 'LabeledSelectMenu';
