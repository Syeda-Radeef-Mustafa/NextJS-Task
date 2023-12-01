import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDt20deUxYPoQsUEGmnGJfMvDDtsxMGbaI",
    authDomain: "proapp-ba821.firebaseapp.com",
    projectId: "proapp-ba821",
    storageBucket: "proapp-ba821.appspot.com",
    messagingSenderId: "790935094305",
    appId: "1:790935094305:web:255f0c8de0d59caf628f60",
    measurementId: "G-W6CB145BEF"  
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, firestore };