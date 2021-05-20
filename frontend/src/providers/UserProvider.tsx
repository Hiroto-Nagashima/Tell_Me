import axios from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../helper/firebaseAuthHelper';
import { User } from '../types/api/user';

type Props = {
  children: ReactNode;
};
export const CurrentUserContext = createContext<User | null>(null);
export const LoadingCurrentUserContext = createContext<boolean>(false);
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
    <CurrentUserContext.Provider value={currentUser}>
      <LoadingCurrentUserContext.Provider value={loadingCurrentUser}>
        {children}
      </LoadingCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
