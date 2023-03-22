import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./reset.css"
import "./main.css"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4mFkhp5Ut-5UDEBNXkW0FfGyMh0lApCk",
    authDomain: "board-game-creator-cde62.firebaseapp.com",
    projectId: "board-game-creator-cde62",
    storageBucket: "board-game-creator-cde62.appspot.com",
    messagingSenderId: "229842028250",
    appId: "1:229842028250:web:97f76e7512ad142b9147e3",
    measurementId: "G-CGP5BZL4HV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
