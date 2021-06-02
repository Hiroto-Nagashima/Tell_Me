import React from 'react';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
export const DraggablePaper: React.FC = (props: PaperProps) => (
  <Draggable
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}
  >
    <Paper {...props} />
  </Draggable>
);
