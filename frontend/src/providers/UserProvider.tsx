import axios from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../helper/firebaseAuthHelper';
import { User } from '../types/api/user';

type Props = {
  children: ReactNode;
};

type CurrentUserContextType = {
  currentUser: User | null;
  loadingCurrentUser: boolean;
};
export const CurrentUserContext =
  createContext<CurrentUserContextType | null>(null);
export const UserProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [user] = useAuthState(getAuth());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(false);

  const fetchUser = () => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/v1/users/fetchUser`, {
          params: {
            uid: user.uid,
          },
        })
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoadingCurrentUser(false));
    } else {
      return null;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, loadingCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
