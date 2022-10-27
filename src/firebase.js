import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile }
 from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'

 const firebaseConfig = {
  apiKey: "AIzaSyAUsrk1SGtwzsKL4tRTS9WLHOs9WvoFrbg",
  authDomain: "all-stufs.firebaseapp.com",
  databaseURL: "https://all-stufs-default-rtdb.firebaseio.com",
  projectId: "all-stufs",
  storageBucket: "all-stufs.appspot.com",
  messagingSenderId: "150812169672",
  appId: "1:150812169672:web:7f5b92761fc13253941cfd"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const signout = onAuthStateChanged(auth, user => setCurrentUser(user));
    return signout;
  }, [])

  return currentUser;
}

export async function upload (file, currentUser,setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
 
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser,{photoURL});

  setLoading(false);
  alert('Upload file');
}