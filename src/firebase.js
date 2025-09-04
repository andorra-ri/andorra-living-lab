import { initializeApp } from '@firebase/app'
import { getStorage } from '@firebase/storage';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCzv-_1rXeNCFxFcaCAiBoRECAEuBPWQ6Q",
    authDomain: "andorra-recerca-innovacio.firebaseapp.com",
    projectId: "andorra-recerca-innovacio",
    storageBucket: "andorra-recerca-innovacio.firebasestorage.app",
    messagingSenderId: "525381711910",
    appId: "1:525381711910:web:001c8c29671392ce8f8ee7"
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app, 'andorra-living-lab-website');
const db = getFirestore(app, 'andorra-living-lab-website')


export { storage, db }