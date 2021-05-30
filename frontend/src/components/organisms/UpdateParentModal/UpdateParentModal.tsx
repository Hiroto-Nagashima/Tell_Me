import React, { ChangeEvent, memo } from 'react';
import styled from 'styled-components';

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { StyledButton, SingleLineTextField } from '../../atoms/index';

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

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

export type Props = {
  open: boolean;
  email: string;
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
    email,
    firstName,
    lastName,
    disabled,
    telephoneNumber,
    onCloseModal,
    onChangeFile,
    onChangeEmail,
    onChangeFirstName,
    onChangeLastName,
    onClickSubmitFile,
    onClickSubmitProfile,
    onChangeTelephoneNumber,
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
                  textName="名"
                  placeholder="太郎"
                  value={firstName}
                  onChange={onChangeFirstName}
                />
              </Box>
            </FlexBox>
            <Box textAlign="center" m={4}>
              <SingleLineTextField
                id="電話番号"
                isFullWidth={true}
                textName="電話番号"
                placeholder="090xxxxxxxx"
                value={telephoneNumber}
                onChange={onChangeTelephoneNumber}
              />
            </Box>
            <Box textAlign="center" m={4}>
              <SingleLineTextField
                id="メールアドレス"
                isFullWidth={true}
                textName="メールアドレス"
                placeholder="xxxx@gmail.com"
                value={email}
                onChange={onChangeEmail}
              />
            </Box>
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
