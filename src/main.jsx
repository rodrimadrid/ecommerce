import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuml2xYAGEjN21S01fUS59yJzyrGa5pLw",
  authDomain: "ketostyle-ab0ef.firebaseapp.com",
  projectId: "ketostyle-ab0ef",
  storageBucket: "ketostyle-ab0ef.appspot.com",
  messagingSenderId: "706219351041",
  appId: "1:706219351041:web:d1c6ef6d9e79976882f400"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
