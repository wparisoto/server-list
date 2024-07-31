import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyA2QY6LufU1nQ27M76HhTij8zlOUmAtxPY",
  authDomain: "panel-servers.firebaseapp.com",
  projectId: "panel-servers",
  storageBucket: "panel-servers.appspot.com",
  messagingSenderId: "1084116019519",
  appId: "1:1084116019519:web:dfe38c07f0b19205244b8a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}
