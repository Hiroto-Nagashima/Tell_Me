import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useHistory } from 'react-router';
import { SignUpPaper } from '../organisms/SignUpPaper/SignUpPaper';
import { CustomizedSnackbar } from '../atoms/CustomizedSnackbar/CustomizedSnackbar';
import { CurrentUserContext } from '../../providers/UserProvider';
import { Spinner } from '../atoms';

export const SignUp: React.FC = () => {
  const history = useHistory();

  const lastNameError = '';
  const firstNameError = '';
  const telephoneNumberRegex = /^(0{1}\d{10,11})$/;

  const { setCurrentUser } = useContext(CurrentUserContext);

  const [role, setRole] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [daycareId, setDaycareId] = useState<number | null>(null);
  const [telephoneNumber, setTelephoneNumber] = useState('');

  const onChangeRole = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    return setRole(e.target.value);
  }, []);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
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

  const onChangeDaycareId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setDaycareId(value);
  }, []);

  const onChangeTelephoneNumber = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setTelephoneNumber(e.target.value);
    },
    [],
  );
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

    return;
  };

  const handleSubmit = () => {
    setLoading(true);
    if (telephoneNumber.match(telephoneNumberRegex) == null) {
      setError('電話番号が無効です');
      setLoading(false);
      setOpen(true);
    } else if (lastName == lastNameError) {
      setError('姓が無効です');
      setLoading(false);
      setOpen(true);
    } else if (firstName == firstNameError) {
      setError('名が無効です');
      setLoading(false);
      setOpen(true);
    } else if (role == '保護者' && gender == null) {
      setError('お父様かお母様か選択してください');
      setLoading(false);
      setOpen(true);
    } else if (role == '先生' && daycareId == null) {
      setError('保育園のIDを入力してください');
      setLoading(false);
      setOpen(true);
    } else if (daycareId != null && gender != null) {
      setError('保育園のIDと「父か母か」を同時に選択しないでください.');
      setLoading(false);
      setOpen(true);
    } else {
      const request = async () => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async () => {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (auth && currentUser) {
              const token = await currentUser.getIdToken(true);
              const config = { headers: { authorization: `Bearer ${token}` } };
              try {
                await axios
                  .post(
                    'http://localhost:5000/api/v1/users',
                    {
                      params: {
                        email: email,
                        role: role,
                        daycare_id: daycareId,
                        password: password,
                        gender: gender,
                        first_name: firstName,
                        last_name: lastName,
                        telephone_number: telephoneNumber,
                      },
                    },
                    config,
                  )
                  .then((res) => {
                    setCurrentUser(res.data.user);
                    if (res.data.user.role == '保護者') {
                      history.push('/kids/register');
                    } else {
                      history.push(
                        `daycares/${res.data.user.daycareId}/teachers/${res.data.user.id}`,
                      );
                    }
                  })
                  .catch((error) => {
                    setError(error?.message);
                    setLoading(false);
                    setOpen(true);
                  });
              } catch (error) {
                setError(error);
                setLoading(false);
              }
            }
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            setLoading(false);
            setOpen(true);
          })
          .finally(() => setLoading(false));
      };
      request();
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SignUpPaper
            email={email}
            role={role}
            daycareId={daycareId}
            password={password}
            firstName={firstName}
            lastName={lastName}
            gender={gender}
            telephoneNumber={telephoneNumber}
            onClick={handleSubmit}
            onChangeDaycareId={onChangeDaycareId}
            onChangeRole={onChangeRole}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onChangeFirstName={onChangeFirstName}
            onChangeLastName={onChangeLastName}
            onChangeGender={onChangeGender}
            onChangeTelephoneNumber={onChangeTelephoneNumber}
          />
          <CustomizedSnackbar
            open={open}
            onClose={handleClose}
            severity="error"
          >
            {error}
          </CustomizedSnackbar>
        </>
      )}
    </>
  );
};
