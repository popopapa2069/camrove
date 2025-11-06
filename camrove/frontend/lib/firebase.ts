// lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB9Z2ydQUpRxfWrHx1bfjFedm79eq-gYN4",
  authDomain: "camrove-98b42.firebaseapp.com",
  projectId: "camrove-98b42",
  storageBucket: "camrove-98b42.firebasestorage.app",
  messagingSenderId: "703624289743",
  appId: "1:703624289743:web:bf40d7d5133aa0036c06ba"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)