import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { SingleLineTextField, FlexibleButton } from '../atoms/index';
import { RadioButtonGroup } from '../molecules/RadioButtonGroup';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { getAuth } from '../../helper/firebaseAuthHelper';

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

export const UpdateKidModal = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState(0);
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [favoriteFood, setFavoriteFood] = useState<string | null>('');
  const [favoritePlay, setFavoritePlay] = useState<string | null>('');
  const [parent] = useAuthState(getAuth());

  const onChangeAge = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setAge(value);
  }, []);

  const onChangeFirstName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setFirstName(e.target.value);
  }, []);

  const onChangeLastName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setLastName(e.target.value);
  }, []);

  const onChangeGender = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setGender(value);
  }, []);

  const onChangeFavoriteFood = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setFavoriteFood(e.target.value);
    },
    [],
  );
  const onChangeFavoritePlay = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setFavoritePlay(e.target.value);
    },
    [],
  );

  const handleSubmit = () => {
    axios
      .post(`http://localhost:5000/api/v1/kids`, {
        params: {
          age: age,
          first_name: firstName,
          last_name: lastName,
          gender: gender,
          favorite_food: favoriteFood,
          favorite_play: favoritePlay,
          uid: parent!.uid,
        },
      })
      .then((res) => {
        // history.push({ pathname: '/', state: res.data.kid });
        console.log(res.data.kid);
      })
      .catch((e) => console.log(e));
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Box component="h3" px={2} my={5} textAlign="center">
            1.写真をアップロードしてください
          </Box>
          <Box textAlign="center" mx={4}>
            <input type="file" />
          </Box>
          <Box component="h3" px={2} my={5} textAlign="center">
            2.登録済み情報を更新してください
          </Box>
          <Box textAlign="center" m={4}>
            <RadioButtonGroup
              value={gender}
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
              onClick={handleSubmit}
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
