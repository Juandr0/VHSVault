import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const FirebaseConfig = {
    apiKey: "AIzaSyAj9jcY-K4uZslJ1IMJYobgwWFRNYhEVTY",
    authDomain: "webbshop-d762c.firebaseapp.com",
    projectId: "webbshop-d762c",
    storageBucket: "webbshop-d762c.appspot.com",
    messagingSenderId: "701571660328",
    appId: "1:701571660328:web:0cf4bf9b02bd7265ccd31d",
    
    getFirestoreInstance: () => {
        const app = initializeApp(FirebaseConfig);
        const db = getFirestore(app);
        return db;
    }
};

export default FirebaseConfig;
