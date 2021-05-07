import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface NewAlertProps extends AlertProps {
  onClose: () => void;
}
export const Alert: React.FC<NewAlertProps> = (props: NewAlertProps) => {
  return <MuiAlert variant="filled" {...props} />;
};
