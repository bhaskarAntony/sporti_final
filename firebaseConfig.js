// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDb9PSXKPOG2QAPufYbquHo1Dakk8hEfeQ",
    authDomain: "sporti-2e307.firebaseapp.com",
    projectId: "sporti-2e307",
    storageBucket: "sporti-2e307.appspot.com",
    messagingSenderId: "719358116230",
    appId: "1:719358116230:web:7e8ee96fb9b719f3552c07",
    measurementId: "G-ERVNEKT4XZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage and export it
const storage = getStorage(app);

export { storage };
