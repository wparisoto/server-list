import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAdTlauAKg5DLXD3VPM7dNP5OtkMlJ-uMM",
  authDomain: "miniblog-6b737.firebaseapp.com",
  projectId: "miniblog-6b737",
  storageBucket: "miniblog-6b737.appspot.com",
  messagingSenderId: "447294116079",
  appId: "1:447294116079:web:81fbf889defe82d85c8b1a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}