import { createContext, useEffect, useState, VFC} from "react";
import { auth } from "../firebase.js";
import * as H from 'history'

type Props={
  children: React.ReactNode
}

type ContextProps = {
  login?:(email: string, password: string, history: H.History) => Promise<void>
  signup?:(email: string, password: string, history: H.History) => Promise<void>
  // 仮に設定
  currentUser?: any
};

// contextの作成
export const AuthContext =createContext<ContextProps>({});

export const AuthProvider:VFC<Props> = (props) => {
  const { children } = props
  const [currentUser, setCurrentUser] = useState<any>(null);

  // ユーザーをログインさせる関数
  const login = async (email:string, password:string, history:H.History) => {
    try {
      console.log("hello")
      await auth.signInWithEmailAndPassword(email, password);
      auth.onAuthStateChanged(user => setCurrentUser(user));
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  // 新しいユーザーを作成しログインさせる関数
  const signup = async (email:string, password:string, history:H.History) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      auth.onAuthStateChanged(user => setCurrentUser(user));
      history.push("/");
    } catch (error) {
      alert(error);
      console.log(error)
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <AuthContext.Provider value={{ signup, login, currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};