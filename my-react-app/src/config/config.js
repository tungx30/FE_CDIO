import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBpOA5A6nczuAmlq9x3y8lCgUyCsCLS-xk",
  authDomain: "cido-e8277.firebaseapp.com",
  projectId: "cido-e8277",
  storageBucket: "cido-e8277.appspot.com",
  messagingSenderId: "166962408310",
  appId: "1:166962408310:web:8611ecee8c92a0f2bde857"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);