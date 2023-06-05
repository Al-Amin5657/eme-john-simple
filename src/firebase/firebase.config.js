// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCeFqasMYt16SA7T6jQlW281N-oUw7IgjA",
    authDomain: "ema-john-with-firebase-a-2b8ca.firebaseapp.com",
    projectId: "ema-john-with-firebase-a-2b8ca",
    storageBucket: "ema-john-with-firebase-a-2b8ca.appspot.com",
    messagingSenderId: "196505385025",
    appId: "1:196505385025:web:7c52bdbc4838a3584daec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;