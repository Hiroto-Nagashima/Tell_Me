import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/organisms/Signup';

function App() {
  return (
    <div className="App">
      Hello World!
      Hello,World
      <Signup/>
+     <div>{`REACT_APP_APIKEY:${process.env.REACT_APP_APIKEY}`}</div>
+     <div>{`REACT_APP_AUTHDOMAIN:${process.env.REACT_APP_AUTHDOMAIN}`}</div>
+     <div>{`REACT_APP_DATABASEURL:${process.env.REACT_APP_DATABASEURL}`}</div>
+     <div>{`REACT_APP_PROJECT_ID:${process.env.REACT_APP_PROJECT_ID}`}</div>
+     <div>{`REACT_APP_STORAGE_BUCKET:${process.env.REACT_APP_STORAGE_BUCKET}`}</div>
+     <div>{`REACT_APP_MESSAGING_SENDER_ID:${process.env.REACT_APP_MESSAGING_SENDER_ID}`}</div>
+     <div>{`REACT_APP_APP_ID:${process.env.REACT_APP_APP_ID}`}</div>
+     <div>{`REACT_APP_MEASUREMENT_ID:${process.env.REACT_APP_MEASUREMENT_ID}`}</div>
    </div>
  );
}

export default App;
