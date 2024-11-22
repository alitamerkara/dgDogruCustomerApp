import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";  // Authentication için

const firebaseConfig = {
  apiKey: "AIzaSyCJPsv4CDtB4uz2_cvWIbWcYWJILXwtS_o",
  authDomain: "dg-dogru-customer.firebaseapp.com",
  projectId: "dg-dogru-customer",
  storageBucket: "dg-dogru-customer.firebasestorage.app",
  messagingSenderId: "1001844327368",
  appId: "1:1001844327368:web:1bc0b5ba87c3d5ebc2f6fd",
  measurementId: "G-KWN3HJ761H"
};

// Firebase'i başlatıyoruz
const app = initializeApp(firebaseConfig);

// Authentication servisini alıyoruz
const auth = getAuth(app);

// reCAPTCHA doğrulamasını başlatmak için fonksiyon
export const configureRecaptcha = () => {
  if (typeof window !== 'undefined') {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',  // Bu id ile bir HTML elemanı oluşturacağız
      {
        size: 'invisible',  // Görünmez olacak
        callback: (response) => {
          // reCAPTCHA doğrulama başarılı olursa çağrılacak
          console.log("reCAPTCHA doğrulandı!");
        },
      },
      auth
    );
  }
};

export { app, auth };
