import React, { ChangeEvent, memo } from 'react';
import styled from 'styled-components';

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup';
import { StyledButton, SingleLineTextField } from '../../atoms/index';

const FlexBox = styled.div`
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
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 20,
    },
  }),
);

export type Props = {
  age: number | null;
  open: boolean;
  gender: number;
  disabled: boolean;
  firstName: string | null;
  lastName: string | null;
  favoriteFood: string | null;
  favoritePlay: string | null;
  onCloseModal: () => void;
  onClickSubmitFile: () => void;
  onClickSubmitProfile: () => void;
  onChangeAge: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFile: (et: ChangeEvent<HTMLInputElement>) => void;
  onChangeGender: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoriteFood: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFavoritePlay: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UpdateKidModal: React.FC<Props> = memo((props) => {
  const {
    age,
    open,
    gender,
    disabled,
    lastName,
    firstName,
    favoriteFood,
    favoritePlay,
    onCloseModal,
    onClickSubmitFile,
    onChangeAge,
    onChangeFile,
    onChangeGender,
    onChangeLastName,
    onChangeFirstName,
    onChangeFavoriteFood,
    onChangeFavoritePlay,
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
                width={30}
                disabled={disabled}
                borderRadius={20}
              />
            </Box>
            <Box m={4}>
              <RadioButtonGroup
                value={gender}
                firstValue={0}
                secondValue={1}
                onChange={onChangeGender}
                firstLabel="女の子"
                secondLabel="男の子"
              />
            </Box>
            <FlexBox>
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
            </FlexBox>
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
            <Box textAlign="right" m={3}>
              <StyledButton
                onClick={onClickSubmitProfile}
                variant="contained"
                label="登録"
                fontSize={15}
                width={30}
                borderRadius={20}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});
UpdateKidModal.displayName = 'UpdateKidModal';
