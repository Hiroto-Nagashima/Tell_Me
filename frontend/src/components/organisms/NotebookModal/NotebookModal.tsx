import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, Button } from '@material-ui/core';
import { MultipleLinesTextField, SingleLineTextField } from '../../atoms';
import { RadioButtonGroup } from '../../molecules';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      borderRadius: 10,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 3),
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export type Props = {
  date: Date | string | null;
  memo: string | null;
  dinner: string | null;
  breakfast: string | null;
  hasBathed: boolean | null;
  bodyTemperature: number | null;
};

export const NotebookModal: React.FC<Props> = (props) => {
  const { date, memo, dinner, breakfast, hasBathed, bodyTemperature } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="text" color="inherit" onClick={handleOpen}>
        確認
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box component="h2" pt={2} textAlign="center">
              {date}の連絡帳
            </Box>
            <Box mx={4}>
              <SingleLineTextField
                id="体温"
                disabled
                textName="体温"
                type="number"
                isFullWidth={false}
                placeholder="36.5"
                value={bodyTemperature}
              />
            </Box>
            <Box mx={4} my={2}>
              <RadioButtonGroup
                value={hasBathed}
                firstValue={true}
                secondValue={false}
                firstLabel="有"
                secondLabel="無"
                disabled
                formLabel="入浴"
              />
            </Box>
            <Box textAlign="center" mx={4} my={2}>
              <MultipleLinesTextField
                label="夕食"
                row={2}
                value={dinner}
                disabled
              />
            </Box>
            <Box textAlign="center" mx={4} my={2}>
              <MultipleLinesTextField
                label="朝食"
                row={2}
                value={breakfast}
                disabled
              />
            </Box>
            <Box textAlign="center" mx={4} my={2}>
              <MultipleLinesTextField
                label="連絡事項"
                row={4}
                value={memo}
                disabled
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
