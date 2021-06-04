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

  return (
    <CurrentKidContext.Provider value={{ currentKid, setCurrentKid }}>
      {children}
    </CurrentKidContext.Provider>
  );
};
