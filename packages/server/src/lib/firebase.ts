import { applicationDefault, initializeApp } from "firebase-admin/app";
import {getAuth} from 'firebase-admin/auth'
import { getFirestore } from "firebase-admin/firestore";

export const app = initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
})

export const auth = getAuth(app)

export const firestore = getFirestore(app)
