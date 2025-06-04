// firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoO8tBYersQ0dmC4EWCzveR09XN18vEAE",
  authDomain: "game-questplataformgamificacao.firebaseapp.com",
  projectId: "game-questplataformgamificacao",
  storageBucket: "game-questplataformgamificacao.appspot.com",
  messagingSenderId: "339485728689",
  appId: "1:339485728689:web:abbe115929b150756e2790",
  measurementId: "G-NJL9LL2KGY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // 🔥 adicionando Firestore

export { app, auth, db };
