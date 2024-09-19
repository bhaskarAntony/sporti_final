// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJhhaHo4uuYdHmZPYAegmHpSLLVaMPqN4",
  authDomain: "sporti-35a88.firebaseapp.com",
  projectId: "sporti-35a88",
  storageBucket: "sporti-35a88.appspot.com",
  messagingSenderId: "414973956616",
  appId: "1:414973956616:web:9023777c9acc94426877bd",
  measurementId: "G-VQ108GNFXV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
