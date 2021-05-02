import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export const Alert: React.FC = (props: AlertProps) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);
