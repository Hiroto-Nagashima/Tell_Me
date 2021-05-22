import React, { ChangeEvent, createRef, memo, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { useParams } from 'react-router';
import { FlexibleButton, SingleLineTextField } from '../atoms/index';
import { RadioButtonGroup } from '../molecules/RadioButtonGroup';
import Resizer from 'react-image-file-resizer';
import styled from 'styled-components';
import { Box } from '@material-ui/core';

const Flexbox = styled.div`
  display: flex;
  justify-content: center;
`;
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
  onChangeAge: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeGender: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoriteFood: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoritePlay: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export const UpdateKidModal: React.FC<Props> = memo((props) => {
  const {
    age,
    open,
    gender,
    firstName,
    lastName,
    favoriteFood,
    favoritePlay,
    onClose,
    onChangeAge,
    onChangeGender,
    onChangeFirstName,
    onChangeLastName,
    onChangeFavoriteFood,
    onChangeFavoritePlay,
    onSubmit,
  } = props;
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
      `http://localhost:5000/api/v1/kids/${id}/registerImage`,
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
              <RadioButtonGroup
                value={gender}
                firstValue={0}
                secondValue={1}
                onChange={onChangeGender}
                firstLabel="女の子"
                secondLabel="男の子"
              />
            </Box>
            <Flexbox>
              <Box textAlign="center" mr={1} mb={2}>
                <SingleLineTextField
                  id="姓"
                  isFullWidth={false}
                  textName="姓"
                  placeholder="山田"
                  value={lastName}
                  onChange={onChangeLastName}
                />
              </Box>
              <Box textAlign="center" ml={1}>
                <SingleLineTextField
                  id="名"
                  isFullWidth={false}
                  textName="太郎"
                  placeholder="空欄は入れないでください"
                  value={firstName}
                  onChange={onChangeFirstName}
                />
              </Box>
            </Flexbox>
            <Box mb={2}>
              <SingleLineTextField
                id="ご年齢"
                isFullWidth={false}
                textName="ご年齢"
                placeholder="数字のみ"
                value={age}
                onChange={onChangeAge}
              />
            </Box>
            <Box textAlign="center" mb={2}>
              <SingleLineTextField
                id="好きな食べ物"
                isFullWidth={true}
                textName="好きな食べ物"
                placeholder="餃子"
                value={favoriteFood}
                onChange={onChangeFavoriteFood}
              />
            </Box>
            <Box textAlign="center">
              <SingleLineTextField
                id="好きな食べ物"
                isFullWidth={true}
                textName="好きな遊び"
                placeholder="おままごと"
                value={favoritePlay}
                onChange={onChangeFavoritePlay}
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
UpdateKidModal.displayName = 'UpdateKidModal';
