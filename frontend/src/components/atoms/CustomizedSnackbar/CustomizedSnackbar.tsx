import React, { memo } from 'react';
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
  children: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  onClose: () => void;
};
export const CustomizedSnackbar: React.FC<Props> = memo((props) => {
  const { open, children, severity, onClose } = props;
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
});

CustomizedSnackbar.displayName = 'CustomizedSnackbar';
