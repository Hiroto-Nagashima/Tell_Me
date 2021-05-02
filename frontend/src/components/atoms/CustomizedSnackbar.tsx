import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from './Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export type Props = {
  open: boolean;
  onClose: () => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  children: string;
};
export const CustomizedSnackbar: React.FC<Props> = (props) => {
  const { open, onClose, severity, children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity={severity}>
          {children}
        </Alert>
      </Snackbar>
    </div>
  );
};
