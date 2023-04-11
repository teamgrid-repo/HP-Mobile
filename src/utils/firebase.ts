import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp({
  apiKey: import.meta.env.HERPLAN_FIREBASE_APIKEY,
  authDomain: import.meta.env.HERPLAN_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.HERPLAN_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.HERPLAN_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.HERPLAN_FIREBASE_MESSAGING_SENDERID,
  appId: import.meta.env.HERPLAN_FIREBASE_APPID,
  measurementId: import.meta.env.HERPLAN_FIREBASE_MESAUREMENTID,
});

