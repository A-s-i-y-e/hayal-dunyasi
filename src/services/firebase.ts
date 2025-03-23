import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut as firebaseSignOut,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZd34mxld_RxluU34LrvBBRO8trt3PFXo",
  authDomain: "hayal-dunyasi.firebaseapp.com",
  projectId: "hayal-dunyasi",
  storageBucket: "hayal-dunyasi.firebasestorage.app",
  messagingSenderId: "875624820974",
  appId: "1:875624820974:web:471a827e14117b441c83ff",
  measurementId: "G-4JEQEPKFQ4",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Kayıt olma fonksiyonu
export const registerUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Kullanıcı adını güncelle
    await updateProfile(user, {
      displayName: displayName,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Giriş yapma fonksiyonu
export const loginUser = async (email: string, password: string) => {
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
  analytics,
  registerUser,
  loginUser,
  signOutUser,
  uploadProfilePicture,
};

export default firebaseService;
