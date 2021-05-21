import axios from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getAuth } from '../helper/firebaseAuthHelper';
import { User } from '../types/api/user';

type Props = {
  children: ReactNode;
};

export const CurrentUserContext = createContext(
  {} as {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
    loadingCurrentUser: boolean;
  },
);

export const UserProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(false);

  const fetchUser = async () => {
    setLoadingCurrentUser(true);
    const user = await getAuth().currentUser;
    if (user) {
      axios
        .get(`http://localhost:5000/api/v1/users/fetchUser`, {
          params: {
            uid: user.uid,
          },
        })
        .then((res) => {
          console.log('hahahaha');
          setCurrentUser(res.data);
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
    fetchUser();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, loadingCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
