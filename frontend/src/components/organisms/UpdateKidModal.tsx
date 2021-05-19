import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { SingleLineTextField, FlexibleButton } from '../atoms/index';
import { RadioButtonGroup } from '../molecules/RadioButtonGroup';
import Resizer from 'react-image-file-resizer';

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);
const Flexbox = styled.div`
  display: flex;
  justify-content: center;
`;
export type Props = {
  isOpen: boolean;
  onClose: () => void;
  age: number | null;
  gender: number;
  firstName: string | null;
  lastName: string | null;
  favoriteFood: string | null;
  favoritePlay: string | null;
  onChangeAge: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeGender: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoriteFood: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoritePlay: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export const UpdateKidModal: React.FC<Props> = (props) => {
  const {
    isOpen,
    onClose,
    age,
    gender,
    firstName,
    lastName,
    favoriteFood,
    favoritePlay,
    onChangeAge,
    onChangeGender,
    onChangeFirstName,
    onChangeLastName,
    onChangeFavoriteFood,
    onChangeFavoritePlay,
    onSubmit,
  } = props;
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [image, setImage] = useState('');

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
        'blob',
      );
    });
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files![0];
      const image = await resizeFile(file);
      setImage(image);
      console.log(image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Box component="h3" px={2} my={5} textAlign="center">
            1.写真をアップロードしてください
          </Box>
          <Box textAlign="center" mx={4}>
            <img src={image} alt="" />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
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
      </Modal>
    </div>
  );
};
