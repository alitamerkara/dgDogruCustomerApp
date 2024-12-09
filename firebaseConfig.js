// Gerekli Firebase ve diğer modülleri import edin
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence, PhoneAuthProvider } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase yapılandırma ayarları
const firebaseConfig = {
  apiKey: "AIzaSyCJPsv4CDtB4uz2_cvWIbWcYWJILXwtS_o",
  authDomain: "dg-dogru-customer.firebaseapp.com",
  projectId: "dg-dogru-customer",
  storageBucket: "dg-dogru-customer.appspot.com",
  messagingSenderId: "1001844327368",
  appId: "1:1001844327368:web:1bc0b5ba87c3d5ebc2f6fd",
  measurementId: "G-KWN3HJ761H",
};

// Firebase uygulamasını başlat
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Firebase Authentication için AsyncStorage persistence ayarı
let auth;
if (!getAuth().app) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage), // AsyncStorage kullanılarak oturum kalıcılığı sağlanıyor
  });
} else {
  auth = getAuth();
}

// Firestore örneğini oluştur ve persistence (veri kalıcılığı) özelliğini etkinleştir
const db = initializeFirestore(app, {
  cacheSizeBytes: 1048576, // 1MB cache boyutu
  persistence: true, // Firestore verisinin kalıcı olmasını sağlar
});

// Modülleri export edin
export { auth, db };
