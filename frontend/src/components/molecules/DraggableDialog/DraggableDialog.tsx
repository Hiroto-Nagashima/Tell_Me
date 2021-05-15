import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DefaultButton } from '../../atoms/DefaultButton/DefaultButton';
import { DraggablePaper } from '../../atoms/DraggablePaper';
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
          <DefaultButton
            variant="outlined"
            color="primary"
            onClick={onClickOK}
            label={okLabel}
            size="medium"
          />
          <DefaultButton
            variant="outlined"
            color="primary"
            onClick={onClickClose}
            label="戻る"
            size="medium"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};
