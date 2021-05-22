import axios from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../helper/firebaseAuthHelper';
import { CurrentUser } from '../types/frontend/currentUser';

type Props = {
  children: ReactNode;
};

export const CurrentUserContext = createContext(
  {} as {
    currentUser: CurrentUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
    loadingCurrentUser: boolean;
  },
);

export const UserProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<CurrentUser>(
    {} as CurrentUser,
  );
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(false);
  const [user, loading] = useAuthState(getAuth());

  const fetchUser = async () => {
    setLoadingCurrentUser(true);
    if (user) {
      axios
        .get(`http://localhost:5000/api/v1/users/fetchUser`, {
          params: {
            uid: user.uid,
          },
        })
        .then((res) => {
          console.log('hahahaha');
          setCurrentUser(res.data.user);
          setLoadingCurrentUser(false);
        })
        .catch((e) => console.log(e));
    } else {
      console.log('fugafuga');

      return null;
    }
  };

  useEffect(() => {
    console.log('heyo');
    !loading && fetchUser();
  }, [loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, loadingCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
