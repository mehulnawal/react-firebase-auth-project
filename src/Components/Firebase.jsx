import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDktwWruV6dj-UF6vbsIV3_hieJfA8kml0",
    authDomain: "fir-authproject-26092025.firebaseapp.com",
    projectId: "fir-authproject-26092025",
    storageBucket: "fir-authproject-26092025.firebasestorage.app",
    messagingSenderId: "369434904361",
    appId: "1:369434904361:web:5f9199279ca072b9c59938",
    databaseURL: 'https://fir-authproject-26092025-default-rtdb.firebaseio.com/'
};

export const Firebase = initializeApp(firebaseConfig);