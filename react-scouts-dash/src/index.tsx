import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBVGjL4Zz_jD8SwbbDRJ4LahYjdQ3oDBPY',
  authDomain: 'scouts-dash.firebaseapp.com',
  databaseURL: 'https://scouts-dash.firebaseio.com',
  projectId: 'scouts-dash',
  storageBucket: 'scouts-dash.appspot.com',
  messagingSenderId: '842058337753',
  appId: '1:842058337753:web:66e40703b4dde8cb88ddc8',
  measurementId: 'G-0WLNN8ZZJJ',
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
