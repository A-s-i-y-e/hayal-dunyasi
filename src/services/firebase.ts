import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Yardımcı fonksiyonlar
export const signIn = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (
  email: string,
  password: string,
  name: string,
  userType: string
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(collection(db, "users"), response.user.uid), {
      name,
      email,
      userType,
      createdAt: new Date().toISOString(),
    });
    return response.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export default {
  auth,
  db,
  storage,
  analytics,
  signIn,
  signUp,
  signOut: signOutUser,
};
