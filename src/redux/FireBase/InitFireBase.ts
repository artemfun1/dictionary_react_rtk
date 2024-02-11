
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Firestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCkUG5kjfyzWtjjetDAPguThEuSWvD1roM",
  authDomain: "test-firebase-56105.firebaseapp.com",
  projectId: "test-firebase-56105",
  storageBucket: "test-firebase-56105.appspot.com",
  messagingSenderId: "977994405474",
  appId: "1:977994405474:web:74ef4b54fe448d7b74633b"
};
 
// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_ADD_ID,
// };

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

// async function getData(db:Firestore) {
//   const dataCol = collection(db, 'data_test');
//   const dataSnapshot = await getDocs(dataCol);
//   const dataList = dataSnapshot.docs.map(doc => doc.data());
//   console.log(dataList)
//   return dataList;
// }