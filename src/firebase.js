// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAWKr-m9ILGGbxsDLhWg9KMcpbn1u3gSrA",
  authDomain: "webex-15c68.firebaseapp.com",
  databaseURL: "https://webex-15c68-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webex-15c68",
  storageBucket: "webex-15c68.appspot.com",
  messagingSenderId: "589333398202",
  appId: "1:589333398202:web:add403e5bd8940b178f883"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getDatabase(app)