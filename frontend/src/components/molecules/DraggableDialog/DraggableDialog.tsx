import React from 'react';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DraggablePaper, StyledButton } from '../../atoms';

const MyDialogTitle = styled(DialogTitle)`
  cursor: move;
`;

export type Props = {
  title?: string;
  isOpen: boolean;
  okLabel: string;
  content: string;
  onClickOK: () => void;
  onClickClose: () => void;
};

export const DraggableDialog: React.FC<Props> = (props) => {
  const { title, isOpen, okLabel, content, onClickOK, onClickClose } = props;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClickClose}
        PaperComponent={DraggablePaper}
      >
        <MyDialogTitle id="draggable-dialog-title">{title}</MyDialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton variant="text" label={okLabel} onClick={onClickOK} />
          <StyledButton variant="text" label="戻る" onClick={onClickClose} />
        </DialogActions>
      </Dialog>
    </div>
  );
};
