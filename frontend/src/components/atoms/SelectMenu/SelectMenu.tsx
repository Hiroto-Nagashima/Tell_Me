import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export type Props = {
  label: string;
  value: number | null;
  numbers: Array<number>;
  onChange: (e: ChangeEvent<{ value: unknown }>) => void;
};

export const SelectMenu: React.FC<Props> = (props) => {
  const { label, value, numbers, onChange } = props;
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select id="simple-select" value={value} onChange={onChange}>
          {numbers.map((number) => {
            return (
              <MenuItem key={number - 1} value={number}>
                {number}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
