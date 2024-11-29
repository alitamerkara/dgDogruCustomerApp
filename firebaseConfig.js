import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJPsv4CDtB4uz2_cvWIbWcYWJILXwtS_o",
  authDomain: "dg-dogru-customer.firebaseapp.com",
  projectId: "dg-dogru-customer",
  storageBucket: "dg-dogru-customer.firebasestorage.app",
  messagingSenderId: "1001844327368",
  appId: "1:1001844327368:web:1bc0b5ba87c3d5ebc2f6fd",
  measurementId: "G-KWN3HJ761H"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Authentication örneğini oluştur
const auth = getAuth(app);

export { auth };
