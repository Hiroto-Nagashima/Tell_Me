import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DefaultButton } from '../../atoms/DefaultButton/DefaultButton';
import { DraggablePaper } from '../../atoms/DraggablePaper';
import { title } from 'process';
export type Props = {
  onClickClose: () => void;
  onClickOpen: () => void;
  onClickRegister: () => void;
  isOpen: boolean;
};

export const DraggableDialog: React.FC<Props> = (props) => {
  const { isOpen, onClickOpen, onClickClose, onClickRegister } = props;
  // const [isOpen, onClickOpen] = useState()

  return (
    <div>
      <DefaultButton
        variant="contained"
        color="primary"
        onClick={onClickOpen}
        label="確認"
        size="medium"
      />
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
            onClick={onClickOpen}
            label="戻る"
            size="medium"
          />
          <DefaultButton
            variant="outlined"
            color="primary"
            onClick={onClickRegister}
            label="登録"
            size="medium"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};
