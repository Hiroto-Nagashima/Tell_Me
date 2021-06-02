import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DraggablePaper, StyledButton } from '../../atoms';
export type Props = {
  isOpen: boolean;
  okLabel: string;
  title?: string;
  content: string;
  onClickOK: () => void;
  onClickClose: () => void;
};

export const DraggableDialog: React.FC<Props> = (props) => {
  const { onClickOK, onClickClose, okLabel, title, content, isOpen } = props;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClickClose}
        PaperComponent={DraggablePaper}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton
            variant="outlined"
            onClick={onClickOK}
            label={okLabel}
          />
          <StyledButton
            variant="outlined"
            onClick={onClickClose}
            label="戻る"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};
