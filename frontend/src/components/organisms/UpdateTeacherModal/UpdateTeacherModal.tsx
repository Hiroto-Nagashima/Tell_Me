import React, { ChangeEvent, createRef, memo, useState } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { FlexibleButton, MultipleLinesTextField } from '../../atoms/index';

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
  onClose: () => void;
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UpdateTeacherModal: React.FC<Props> = memo((props) => {
  const { open, selfIntroduction, onChange, onClose, onSubmit } = props;

  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files![0];
      const image = await resizeFile(file);
      setImage(image);
      console.log(image);

      return image;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    const submitData = new FormData();

    submitData.append('image', image);
    console.log(submitData);
    await axios.post(
      `http://localhost:5000/api/v1/users/${id}/registerImage`,
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
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onClose}
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
                onChange={handleFileChange}
                accept="image/*"
              />
              <input
                type="button"
                value="Submit"
                ref={fileInput}
                onClick={handleSubmit}
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
                onChange={onChange}
              />
            </Box>
            <Box textAlign="center" m={5}>
              <FlexibleButton
                onClick={onSubmit}
                variant="contained"
                color="primary"
                label="登録"
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});
UpdateTeacherModal.displayName = 'UpdateTeacherModal';
