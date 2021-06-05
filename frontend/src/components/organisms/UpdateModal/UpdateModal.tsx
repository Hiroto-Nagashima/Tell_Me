import React, { ChangeEvent, memo, ReactNode } from 'react';

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { StyledButton } from '../../atoms/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 20,
    },
  }),
);

export type Props = {
  open: boolean;
  email: string;
  children: ReactNode;
  disabled: boolean;
  telephoneNumber: string;
  firstName: string | null;
  lastName: string | null;
  onCloseModal: () => void;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTelephoneNumber: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFile: (et: ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitFile: () => void;
  onClickSubmitProfile: () => void;
};

export const UpdateParentModal: React.FC<Props> = memo((props) => {
  const {
    open,
    disabled,
    children,
    onCloseModal,
    onChangeFile,
    onClickSubmitFile,
    onClickSubmitProfile,
  } = props;

  const classes = useStyles();

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={onCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box component="h3" px={2} my={5} textAlign="center">
              プロフィール画像のアップロード
            </Box>
            <Box textAlign="center" mx={4}>
              <input
                type="file"
                name="image"
                onChange={onChangeFile}
                accept="image/*"
              />
            </Box>
            <Box textAlign="right" m={3}>
              <StyledButton
                variant="contained"
                label="登録"
                onClick={onClickSubmitFile}
                fontSize={15}
                borderRadius={20}
                disabled={disabled}
                width={30}
              />
            </Box>
            {children}
            <Box textAlign="right" m={3}>
              <StyledButton
                onClick={onClickSubmitProfile}
                variant="contained"
                label="登録"
                width={30}
                fontSize={15}
                borderRadius={20}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});

UpdateParentModal.displayName = 'UpdateParentModal';
