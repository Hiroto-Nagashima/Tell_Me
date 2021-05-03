import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);
export type Props = {
  color?: 'inherit' | 'primary' | 'secondary';
};

export const Spinner: React.FC<Props> = (props) => {
  const { color } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color={color} />
    </div>
  );
};
