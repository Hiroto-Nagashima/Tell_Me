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
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export type Props = {
  age: number | null;
  open: boolean;
  gender: number;
  firstName: string | null;
  lastName: string | null;
  favoriteFood: string | null;
  favoritePlay: string | null;
  onClose: () => void;
  onSubmit: () => void;
  onChangeAge: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeGender: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoriteFood: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoritePlay: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UpdateTeacherModal: React.FC<Props> = memo((props) => {
  const { open, onClose, onSubmit } = props;

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
              2.登録済み情報を更新してください
            </Box>
            <Box textAlign="center" m={4}>
              <MultipleLinesTextField
                label="Announcement"
                variant="standard"
                row={5}
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
