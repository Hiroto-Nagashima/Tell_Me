import 'firebase/auth';
import firebase from 'firebase/app';
import { firebaseConfig } from '../config/firebaseConfig';

let _app: firebase.app.App | null = null;

export function getApp() {
  if (_app) return _app;
  if (firebase.apps.length > 0) {
    return (_app = firebase.app());
  } else {
    _app = firebase.initializeApp(firebaseConfig);
    return _app;
  }
}

export function getAuth() {
  return getApp().auth();
}
