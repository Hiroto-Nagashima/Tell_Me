import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { Kid } from '../../types/frontend/kid';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CurrentUserContext } from '../../providers/UserProvider';

import { Box } from '@material-ui/core';
import { Spinner, CustomizedSnackbar } from '../atoms';
import { KidProfile, UpdateKidModal, ParentProfile } from '../organisms';
import { UpdateParentModal } from '../organisms/UpdateParentModal/UpdateParentModal';

export const Home: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [parent] = useAuthState(getAuth());

  const { currentUser } = useContext(CurrentUserContext);

  const [age, setAge] = useState<number | null>(null);
  const [kid, setKid] = useState<Kid>({} as Kid);
  const [image, setImage] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [gender, setGender] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMassage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [KidLastName, setKidLastName] = useState<string>('');
  const [KidFirstName, setKidFirstName] = useState<string>('');
  const [parentLastName, setParentLastName] = useState<string>('');
  const [parentFirstName, setParentFirstName] = useState<string>('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [favoriteFood, setFavoriteFood] = useState<string>('');
  const [favoritePlay, setFavoritePlay] = useState<string>('');
  const [isKidModalOpen, setIsKidModalOpen] = useState(false);
  const [isPatentModalOpen, setIsParentModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [severity, setSeverity] =
    useState<'error' | 'warning' | 'info' | 'success'>('error');

  const onChangeAge = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setAge(value);
  }, []);

  const onChangeKidFirstName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setKidFirstName(e.target.value);
    },
    [],
  );

  const onChangeparentFirstName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setParentFirstName(e.target.value);
    },
    [],
  );

  const onChangeKidLastName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setKidLastName(e.target.value);
    },
    [],
  );

  const onChangeparentLastName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setParentLastName(e.target.value);
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

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  }, []);

  const onChangeTelephoneNumber = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setTelephoneNumber(e.target.value);
    },
    [],
  );

  const onCloseKidModal = useCallback(() => {
    setIsKidModalOpen(false);
  }, []);

  const onClickKidModal = useCallback(() => {
    setIsKidModalOpen(true);
  }, []);

  const onClickParentModal = useCallback(() => {
    setIsParentModalOpen(true);
  }, []);

  const onCloseParentModal = useCallback(() => {
    setIsKidModalOpen(false);
  }, []);

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

  const onClickSubmitKidImage = async () => {
    const submitData = new FormData();
    submitData.append('image', image);
    await axios
      .post(
        `http://localhost:5000/api/v1/kids/${id}/register_image`,
        submitData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      )
      .then((res) => {
        setMassage(res.data.message);
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
      .put(`http://localhost:5000/api/v1/kids/${id}`, {
        params: {
          age: age,
          first_name: KidFirstName,
          last_name: KidLastName,
          gender: gender,
          favorite_food: favoriteFood,
          favorite_play: favoritePlay,
          uid: parent!.uid,
        },
      })
      .then((res) => {
        setKid(res.data.kid);
        setMassage(res.data.message);
        setIsKidModalOpen(false);
        setSeverity('success');
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

  const onClickSubmitParentImage = async () => {
    const submitData = new FormData();
    submitData.append('image', image);
    await axios.post(
      `http://localhost:5000/api/v1/users/${currentUser.id}/register_image`,
      submitData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
  };

  const tryUpdateParent = () => {
    setLoading(true);
    const user = getAuth().currentUser;
    user!
      .updateEmail(email)
      .then(() => {
        axios
          .put(`http://localhost:5000/api/v1/users/${currentUser.id}`, {
            params: {
              email: email,
              first_name: parentFirstName,
              last_name: parentLastName,
              telephone_number: telephoneNumber,
            },
          })
          .then((res) => {
            setEmail(res.data.email);
            setParentLastName(res.data.lastName);
            setParentFirstName(res.data.firstName);
            setTelephoneNumber(res.data.telephoneNumber);
            setMassage(res.data.message);
            setIsParentModalOpen(false);
            setSeverity('success');
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

  const fetchKid = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/api/v1/kids/${id}`)
      .then((res) => {
        setKid(res.data.kid);
        setAge(res.data.kid.age);
        setKidLastName(res.data.kid.lastName);
        setKidFirstName(res.data.kid.firstName);
        setFavoriteFood(res.data.kid.favoriteFood);
        setFavoritePlay(res.data.kid.favoritePlay);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchKid();
  }, []);

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
              age={kid.age}
              kidId={id}
              gender={kid.gender}
              firstName={kid.firstName}
              lastName={kid.lastName}
              favoriteFood={kid.favoriteFood}
              favoritePlay={kid.favoritePlay}
              onClick={onClickKidModal}
            />
            <div key={currentUser.id}>
              <ParentProfile
                id={currentUser.id}
                onClick={onClickParentModal}
                email={currentUser.email}
                gender={currentUser.gender}
                telephoneNumber={currentUser.telephoneNumber}
                firstName={currentUser.firstName}
                lastName={currentUser.lastName}
              />
            </div>
          </Box>
          <UpdateKidModal
            age={age}
            disabled={disabled}
            gender={gender}
            firstName={KidFirstName}
            lastName={KidLastName}
            favoriteFood={favoriteFood}
            favoritePlay={favoritePlay}
            open={isKidModalOpen}
            onChangeFile={tryResizeFile}
            onCloseModal={onCloseKidModal}
            onChangeAge={onChangeAge}
            onChangeGender={onChangeGender}
            onClickSubmitFile={onClickSubmitKidImage}
            onClickSubmitProfile={tryUpdateKid}
            onChangeLastName={onChangeKidLastName}
            onChangeFirstName={onChangeKidFirstName}
            onChangeFavoriteFood={onChangeFavoriteFood}
            onChangeFavoritePlay={onChangeFavoritePlay}
          />
          <UpdateParentModal
            disabled={disabled}
            firstName={parentFirstName}
            lastName={parentLastName}
            telephoneNumber={telephoneNumber}
            email={email}
            open={isPatentModalOpen}
            onChangeEmail={onChangeEmail}
            onChangeTelephoneNumber={onChangeTelephoneNumber}
            onChangeFile={tryResizeFile}
            onCloseModal={onCloseParentModal}
            onClickSubmitFile={onClickSubmitParentImage}
            onClickSubmitProfile={tryUpdateParent}
            onChangeFirstName={onChangeparentFirstName}
            onChangeLastName={onChangeparentLastName}
          />
          <CustomizedSnackbar
            open={isSnackbarOpen}
            onClose={onCloseSnackbar}
            severity={severity}
          >
            {message}
          </CustomizedSnackbar>
        </>
      )}
    </>
  );
};
