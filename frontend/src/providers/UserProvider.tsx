import axios from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../helper/firebaseAuthHelper';

type Props = {
  children: ReactNode;
};
const UserContext = createContext({});
export const UserProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [user] = useAuthState(getAuth());
  const [currentUser, setCurrentUser] = useState('');
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(false);

  const fetchUser = () => setLoadingCurrentUser(true);
  axios
    .get(`http://localhost:5000/api/v1/users/fetchUser`, {
      params: {
        uid: user!.uid,
      },
    })
    .then((res) => {
      setCurrentUser(res.data);
    })
    .catch((e) => console.log(e))
    .finally(() => setLoadingCurrentUser(false));

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, loadingCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
