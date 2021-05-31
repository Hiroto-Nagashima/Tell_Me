import React, { createContext, ReactNode, useEffect, useState } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { getAuth } from '../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CurrentUser } from '../types/frontend/currentUser';

import { Spinner } from '../components/atoms';
import { useHistory } from 'react-router';

type Props = {
  children: ReactNode;
};

export const CurrentUserContext = createContext(
  {} as {
    currentUser: CurrentUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  },
);

export const UserProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const history = useHistory();

  const [user, loading] = useAuthState(getAuth());

  const [error, setError] = useState(false);

  const [currentUser, setCurrentUser] = useState<CurrentUser>(
    {} as CurrentUser,
  );

  const logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => history.push('/'))
      .catch((e) => alert(e));
  };

  const fetchUser = async () => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/v1/users/fetch_user`, {
          params: {
            uid: user.uid,
          },
        })
        .then((res) => {
          setCurrentUser(res.data.user);
        })
        .catch((e) => setError(e));
    } else {
      return null;
    }
  };

  useEffect(() => {
    !loading && fetchUser();
  }, [loading]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <button onClick={() => logout()}>ログアウト</button>;
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
