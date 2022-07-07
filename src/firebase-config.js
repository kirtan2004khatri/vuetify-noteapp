import {initializeApp} from 'firebase/app';
import {getFirestore,collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD8ghk_oN7YwzjDCPxeQfOrEPEX1WvEvfM",
    authDomain: "vue-note-app-dc8b4.firebaseapp.com",
    projectId: "vue-note-app-dc8b4",
    storageBucket: "vue-note-app-dc8b4.appspot.com",
    messagingSenderId: "219560402093",
    appId: "1:219560402093:web:a5f81c515dc6aef5667a24"
  };

initializeApp(firebaseConfig);

const db=getFirestore();

const colRef=collection(db,'notes');

export {db,colRef}