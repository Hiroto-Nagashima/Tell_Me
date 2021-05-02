import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export const Alert = (props: AlertProps) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);
