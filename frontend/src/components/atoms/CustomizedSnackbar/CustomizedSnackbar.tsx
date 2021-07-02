import React, { memo } from 'react';
import styled from 'styled-components';

import { Alert } from './Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 2%;
`;

export type Props = {
  open: boolean;
  children: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  onClose: () => void;
};
export const CustomizedSnackbar: React.FC<Props> = memo((props) => {
  const { open, children, severity, onClose } = props;

  return (
    <Wrapper>
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert severity={severity} onClose={onClose}>
          {children}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
});

CustomizedSnackbar.displayName = 'CustomizedSnackbar';
