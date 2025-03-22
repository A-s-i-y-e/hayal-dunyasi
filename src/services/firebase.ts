import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
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
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Kullanıcı bilgilerini Firestore'a kaydet
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

// Storage işlemleri
const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};

const deleteFile = async (path: string): Promise<void> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    throw error;
  }
};

const listFiles = async (path: string): Promise<string[]> => {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    const urls = await Promise.all(
      result.items.map((item) => getDownloadURL(item))
    );
    return urls;
  } catch (error) {
    throw error;
  }
};

// Profil resmi işlemleri
const uploadProfilePicture = async (
  user: User,
  file: File
): Promise<string> => {
  const path = `users/${user.uid}/profile-picture`;
  return uploadFile(file, path);
};

// Çizim işlemleri
const uploadDrawing = async (
  user: User,
  file: File,
  drawingName: string
): Promise<string> => {
  const path = `users/${user.uid}/drawings/${drawingName}`;
  return uploadFile(file, path);
};

// Hikaye görselleri işlemleri
const uploadStoryImage = async (
  user: User,
  file: File,
  storyId: string
): Promise<string> => {
  const path = `users/${user.uid}/stories/${storyId}/images/${file.name}`;
  return uploadFile(file, path);
};

const firebaseService = {
  auth,
  db,
  storage,
  analytics,
  signIn,
  signUp,
  signOutUser,
  uploadFile,
  deleteFile,
  listFiles,
  uploadProfilePicture,
  uploadDrawing,
  uploadStoryImage,
};

export default firebaseService;
