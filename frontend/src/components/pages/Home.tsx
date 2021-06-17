import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CurrentUserContext } from '../../providers/UserProvider';
import { useFetchKid } from '../../hooks/useFetchKid';

import { Box } from '@material-ui/core';
import { Spinner, CustomizedSnackbar } from '../atoms';
import {
  KidProfile,
  ParentProfile,
  UpdateModal,
  UpdateKid,
  UpdateParent,
} from '../organisms';

export const Home: React.FC = () => {
  const {
    error,
    loading,
    currentKid,
    age,
    gender,
    kidLastName,
    kidFirstName,
    favoriteFood,
    favoritePlay,
    getKid,
    setCurrentKid,
    setAge,
    setLoading,
    setGender,
    setKidLastName,
    setKidFirstName,
    setFavoriteFood,
    setFavoritePlay,
  } = useFetchKid();

  const { id } = useParams<{ id: string }>();
  const [parent] = useAuthState(getAuth());
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [isKidModalOpen, setIsKidModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [parentLastName, setParentLastName] = useState<string>('');
  const [parentFirstName, setParentFirstName] = useState<string>('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  const [image, setImage] = useState<any>(null);
  const [message, setMassage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('error');

  const onChangeAge = useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) => {
      const value = Number(e.target.value);

      return setAge(value);
    },
    [],
  );

  const onChangeKidFirstName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setKidFirstName(e.target.value);
    },
    [],
  );

  const onChangeKidLastName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setKidLastName(e.target.value);
    },
    [],
  );

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

  const onCloseKidModal = useCallback(() => {
    setIsKidModalOpen(false);
  }, []);

  const onClickKidModal = useCallback(() => {
    setIsKidModalOpen(true);
  }, []);

  const onClickSubmitKidImage = async () => {
    setLoading(true);
    const submitData = new FormData();
    submitData.append('image', image);
    await axios
      .post(`${API_ENDPOINT}kids/${id}/register_image`, submitData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setMassage(res.data.message);
        setImage(null);
        setDisabled(true);
        setIsKidModalOpen(false);
        setSeverity(res.data.severity);
      })
      .catch(() => {
        setMassage('更新失敗しました');
        setSeverity('error');
      })
      .finally(() => {
        setLoading(false);
        setIsSnackbarOpen(true);
      });
  };

  const tryUpdateKid = () => {
    setLoading(true);
    axios
      .put(`${API_ENDPOINT}kids/${id}`, {
        params: {
          uid: parent!.uid,
          age: age,
          gender: gender,
          last_name: kidLastName,
          first_name: kidFirstName,
          favorite_food: favoriteFood,
          favorite_play: favoritePlay,
        },
      })
      .then((res) => {
        setCurrentKid(res.data.kid);
        setMassage(res.data.message);
        setSeverity('success');
        setIsKidModalOpen(false);
      })
      .catch(() => {
        setMassage('更新に失敗しました');
        setSeverity('error');
      })
      .finally(() => {
        setLoading(false);
        setImage(null);
        setIsSnackbarOpen(true);
      });
  };

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  }, []);

  const onChangeParentFirstName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setParentFirstName(e.target.value);
    },
    [],
  );

  const onChangeParentLastName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setParentLastName(e.target.value);
    },
    [],
  );

  const onChangeTelephoneNumber = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setTelephoneNumber(e.target.value);
    },
    [],
  );

  const onClickParentModal = useCallback(() => {
    setIsParentModalOpen(true);
  }, []);

  const onCloseParentModal = useCallback(() => {
    setIsParentModalOpen(false);
  }, []);

  const onClickSubmitParentImage = async () => {
    setLoading(true);
    const submitData = new FormData();
    submitData.append('image', image);
    await axios
      .post(
        `${API_ENDPOINT}users/${currentUser.id}/register_image`,
        submitData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      )
      .then((res) => {
        setMassage(res.data.message);
        setSeverity(res.data.severity);
        setImage(null);
        setDisabled(true);
        setIsParentModalOpen(false);
      })
      .catch(() => {
        setMassage('更新失敗しました');
        setSeverity('error');
      })
      .finally(() => {
        setLoading(false);
        setIsSnackbarOpen(true);
      });
  };

  const tryUpdateParent = () => {
    setLoading(true);
    const user = getAuth().currentUser;
    user!
      .updateEmail(email)
      .then(() => {
        axios
          .put(`${API_ENDPOINT}users/${currentUser.id}`, {
            params: {
              email: email,
              last_name: parentLastName,
              first_name: parentFirstName,
              telephone_number: telephoneNumber,
            },
          })
          .then((res) => {
            setEmail(res.data.email);
            setCurrentUser(res.data);
            setParentLastName(res.data.lastName);
            setParentFirstName(res.data.firstName);
            setTelephoneNumber(res.data.telephoneNumber);
            setMassage(res.data.message);
            setSeverity('success');
            setIsParentModalOpen(false);
          })
          .catch(() => {
            setMassage('登録に失敗しました');
            setSeverity('error');
          })
          .finally(() => {
            setLoading(false);
            setIsSnackbarOpen(true);
          });
      })
      .catch(() => {
        setMassage(
          'メールアドレスの更新に失敗しました。ログアウトしてからもう一度試してください',
        );
        setSeverity('error');
        setLoading(false);
        setIsSnackbarOpen(true);
      });
  };
  const onCloseSnackbar = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsSnackbarOpen(false);

      return;
    },
    [],
  );

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

  const tryResizeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files![0];
      const image = await resizeFile(file);
      setImage(image);
      setDisabled(false);

      return image;
    } catch (err) {
      alert(err);
    }
  };

  const setUser = () => {
    setEmail(currentUser.email);
    setParentLastName(currentUser.lastName);
    setParentFirstName(currentUser.firstName);
    setTelephoneNumber(currentUser.telephoneNumber);
  };

  useEffect(() => {
    currentUser && (getKid(), setUser());
  }, [currentUser]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <Box display="flex" justifyContent="space-around">
            <KidProfile
              age={currentKid.age}
              kidId={id}
              gender={currentKid.gender}
              lastName={currentKid.lastName}
              firstName={currentKid.firstName}
              favoriteFood={currentKid.favoriteFood}
              favoritePlay={currentKid.favoritePlay}
              onClick={onClickKidModal}
            />
            <div key={currentUser.id}>
              <ParentProfile
                id={currentUser.id}
                email={currentUser.email}
                gender={currentUser.gender}
                lastName={currentUser.lastName}
                firstName={currentUser.firstName}
                telephoneNumber={currentUser.telephoneNumber}
                onClick={onClickParentModal}
              />
            </div>
          </Box>
          <UpdateModal
            open={isKidModalOpen}
            disabled={disabled}
            onChangeFile={tryResizeFile}
            onCloseModal={onCloseKidModal}
            onClickSubmitFile={onClickSubmitKidImage}
            onClickSubmitProfile={tryUpdateKid}
          >
            <UpdateKid
              age={age}
              gender={gender}
              lastName={kidLastName}
              firstName={kidFirstName}
              favoriteFood={favoriteFood}
              favoritePlay={favoritePlay}
              onChangeAge={onChangeAge}
              onChangeGender={onChangeGender}
              onChangeLastName={onChangeKidLastName}
              onChangeFirstName={onChangeKidFirstName}
              onChangeFavoriteFood={onChangeFavoriteFood}
              onChangeFavoritePlay={onChangeFavoritePlay}
            />
          </UpdateModal>
          <UpdateModal
            open={isParentModalOpen}
            disabled={disabled}
            onChangeFile={tryResizeFile}
            onCloseModal={onCloseParentModal}
            onClickSubmitFile={onClickSubmitParentImage}
            onClickSubmitProfile={tryUpdateParent}
          >
            <UpdateParent
              email={email}
              lastName={parentLastName}
              firstName={parentFirstName}
              telephoneNumber={telephoneNumber}
              onChangeEmail={onChangeEmail}
              onChangeLastName={onChangeParentLastName}
              onChangeFirstName={onChangeParentFirstName}
              onChangeTelephoneNumber={onChangeTelephoneNumber}
            />
          </UpdateModal>
          <CustomizedSnackbar
            open={isSnackbarOpen}
            severity={severity}
            onClose={onCloseSnackbar}
          >
            {message}
          </CustomizedSnackbar>
        </>
      )}
    </>
  );
};

Home.displayName = 'Home';
