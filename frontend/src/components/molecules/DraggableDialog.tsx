import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const PaperComponent: React.FC = (props: PaperProps) => (
  <Draggable
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}
  >
    <Paper {...props} />
  </Draggable>
);
export type Props = {
  onClickClose: () => void;
  onClickOpen: () => void;
  onClickRegister: () => void;
  isOpen: boolean;
};

export const DraggableDialog: React.FC<Props> = (props) => {
  const { isOpen, onClickOpen, onClickClose, onClickRegister } = props;

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={onClickOpen}>
        登録
      </Button>
      <Dialog
        open={isOpen}
        onClose={onClickClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          登録確認
        </DialogTitle>
        <DialogContent>
          <DialogContentText>この内容で登録しますか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose} color="primary">
            戻る
          </Button>
          <Button onClick={onClickRegister} color="primary">
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
