import React, { createContext, ReactNode, useState } from 'react';
import { Kid } from '../types/frontend/kid';

type Props = {
  children: ReactNode;
};

export const CurrentKidContext = createContext(
  {} as {
    currentKid: Kid;
    setCurrentKid: React.Dispatch<React.SetStateAction<Kid>>;
  },
);

export const KidProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const [currentKid, setCurrentKid] = useState<Kid>({} as Kid);

  // const logout = async () => {
  //   await firebase
  //     .auth()
  //     .signOut()
  //     .then(() => history.push('/'))
  //     .catch((e) => alert(e));
  // };

  // const fetchKid = async () => {
  //   setLoading(true);
  //   console.log('foofoo');
  //   await axios
  //     .get(`http://localhost:5000/api/v1/kids/${currentKid.id}`)
  //     .then((res) => {
  //       setCurrentKid(res.data.kid);
  //     })
  //     .catch((e) => setError(e))
  //     .finally(() => setLoading(false));
  // };

  // useEffect(() => {
  //   currentKid && fetchKid();
  // }, []);

  // if (loading) {
  //   return <Spinner />;
  // }

  // if (error) {
  //   return <button onClick={() => logout()}>ログアウト</button>;
  // }

  return (
    <CurrentKidContext.Provider value={{ currentKid, setCurrentKid }}>
      {children}
    </CurrentKidContext.Provider>
  );
};
