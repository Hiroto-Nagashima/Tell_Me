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

type Props = {
  open: boolean;
  onClose: () => void;
  severity: 'error' | 'warning' | 'info' | 'success';
};
export const CustomizedSnackbar: React.FC<Props> = (props) => {
  const { open, onClose, severity } = props;
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity={severity}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};
