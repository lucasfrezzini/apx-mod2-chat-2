const FIREBASE_API_KEY = "AIzaSyCt1UUh4BnIVgMbYxHl6iUD9loKaXTFdFY";
const FIREBASE_AUTH_DOMAIN = "apx-n2-backend-1.firebaseapp.com";
const FIREBASE_DB_URL = "https://apx-n2-backend-1-default-rtdb.firebaseio.com";
const FIREBASE_PROJECT_ID = "apx-n2-backend-1";
const FIREBASE_STORAGE_BUCKET = "apx-n2-backend-1.appspot.com";
const FIREBASE_MSG_SENDER_ID = "596737096621";
const FIREBASE_APP_ID = "1:596737096621:web:4c314d9304bdc94ba93f24";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DB_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MSG_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
console.log("Conexion a Database establecida.");
export { database };
