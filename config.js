import * as firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

//Api detayları
const firebaseConfig = {
    apiKey: "AIzaSyBK6gwnac9ZIN_lYA8EFf-Xnr2MSrStw9g",
    authDomain: "homto-cca6a.firebaseapp.com",
    databaseURL: "https://homto-cca6a.firebaseio.com",
    projectId: "homto-cca6a",
    storageBucket: "homto-cca6a.appspot.com",
    messagingSenderId: "95612896599",
    appId: "1:95612896599:web:b3061b7f81b5c14b26aa12",
    measurementId: "G-4ZYD06CEP1"
  };

  firebase.initializeApp(firebaseConfig);

  export const f=firebase;
  export const database=firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();
