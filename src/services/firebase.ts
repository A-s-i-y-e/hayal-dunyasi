import {
  signOut as firebaseSignOut,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

// Firebase servislerini yeniden export et
export { auth, db, storage };

const firebaseService = {
  auth,
  db,
  storage,
  registerUser,
  loginUser,
  signOutUser,
  uploadProfilePicture,
};

export default firebaseService;
