import React, { createContext, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from '../helper/firebaseAuthHelper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CurrentUser } from '../types/frontend/currentUser';

import { Spinner } from '../components/atoms';

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

  const [user, loading] = useAuthState(getAuth());

  const [error, setError] = useState(false);

  const [currentUser, setCurrentUser] = useState<CurrentUser>(
    {} as CurrentUser,
  );

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
    return <div>エラーです</div>;
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
