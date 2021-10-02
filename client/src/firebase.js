import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-0SywA3E5AysUmRt9olvzRsTzj61w3IE",
  authDomain: "reviewamovie-ad325.firebaseapp.com",
  projectId: "reviewamovie-ad325",
  storageBucket: "reviewamovie-ad325.appspot.com",
  messagingSenderId: "417639526636",
  appId: "1:417639526636:web:19abf95504100cd20435c9",
  measurementId: "G-T6FSS25ZXJ",
};

initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);
const storage = getStorage();
export default storage;
