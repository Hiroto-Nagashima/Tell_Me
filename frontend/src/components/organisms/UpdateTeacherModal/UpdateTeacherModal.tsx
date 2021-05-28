import React, { ChangeEvent, createRef, memo, useState } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { useParams } from 'react-router';

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { StyledButton, MultipleLinesTextField } from '../../atoms/index';

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
  selfIntroduction: string | null;
  onCloseModal: () => void;
  onClickSubmit: () => void;
  onChangeSelfIntroduction: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UpdateTeacherModal: React.FC<Props> = memo((props) => {
  const {
    open,
    selfIntroduction,
    onChangeSelfIntroduction,
    onCloseModal,
    onClickSubmit,
  } = props;

  const classes = useStyles();

  const { teacherId } = useParams<{ teacherId: string }>();

  const [image, setImage] = useState<any>('');

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64',
      );
    });

  const fileInput = createRef<HTMLInputElement>();

  const tryResizeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files![0];
      const image = await resizeFile(file);
      setImage(image);

      return image;
    } catch (err) {
      console.log(err);
    }
  };

  const onClickSubmitFile = async () => {
    const submitData = new FormData();
    submitData.append('image', image);
    await axios.post(
      `http://localhost:5000/api/v1/users/${teacherId}/register_image`,
      submitData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
  };

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
              1.写真をアップロードしてください
            </Box>
            <Box textAlign="center" mx={4}>
              <input
                type="file"
                name="image"
                onChange={tryResizeFile}
                accept="image/*"
              />
              <input
                type="button"
                value="Submit"
                ref={fileInput}
                onClick={onClickSubmitFile}
              />
            </Box>
            <Box component="h3" px={2} my={5} textAlign="center">
              2.自己紹介を更新してください
            </Box>
            <Box textAlign="center" m={4}>
              <MultipleLinesTextField
                label="自己紹介"
                variant="standard"
                row={5}
                value={selfIntroduction}
                onChange={onChangeSelfIntroduction}
              />
            </Box>
            <Box textAlign="center" m={5}>
              <StyledButton
                onClick={onClickSubmit}
                onChange={tryResizeFile}
                variant="contained"
                label="登録"
                fontSize={20}
                width={60}
                borderRadius={20}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});

UpdateTeacherModal.displayName = 'UpdateTeacherModal';
