import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnveSkEL--8Y0X74BWYudDUMOTNP_wkVo",
  authDomain: "reviews-bf709.firebaseapp.com",
  projectId: "reviews-bf709",
  storageBucket: "reviews-bf709.appspot.com",
  messagingSenderId: "755606969303",
  appId: "1:755606969303:web:bbce2d651fb4fce5cf4992",
  measurementId: "G-X2WPBR6HHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { db, auth, storage, analytics };