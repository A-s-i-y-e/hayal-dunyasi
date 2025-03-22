import { initializeApp } from "firebase/app";
import { getAuth, signOut as firebaseSignOut, User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7YC2VKgXhCrWZGKR-ydkVf7FGRupJZp0",
  authDomain: "hayal-dunyasi-app.firebaseapp.com",
  projectId: "hayal-dunyasi-app",
  storageBucket: "hayal-dunyasi-app.appspot.com",
  messagingSenderId: "1012494161672",
  appId: "1:1012494161672:web:c2c4c2c2c2c2c2c2c2c2c2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Çıkış yapma fonksiyonu
export const signOutUser = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

// Profil resmi yükleme fonksiyonu
export const uploadProfilePicture = async (
  user: User,
  file: File
): Promise<string> => {
  try {
    const path = `users/${user.uid}/profile-picture`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};

const firebaseService = {
  auth,
  db,
  storage,
  signOutUser,
  uploadProfilePicture,
};

export default firebaseService;
