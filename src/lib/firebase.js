// NOTE: import only the Firebase modules that you need in your app.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyB7TYG4C2zQ0ifAQX8hDj_cKO9qsN6Oizo',
  authDomain: 'tcl-44-smart-shopping-list.firebaseapp.com',
  projectId: 'tcl-44-smart-shopping-list',
  storageBucket: 'tcl-44-smart-shopping-list.appspot.com',
  messagingSenderId: '979432886853',
  appId: '1:979432886853:web:d0200c036da6807255892c',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
