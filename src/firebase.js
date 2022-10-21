import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import NotificationManager from "react-notifications/lib/NotificationManager";

const firebaseConfig = {
  apiKey: "AIzaSyA7amJfMkZN_4tc1GbP-mhGmbNVeKGhaeE",
  authDomain: "tut7app.firebaseapp.com",
  projectId: "tut7app",
  storageBucket: "tut7app.appspot.com",
  messagingSenderId: "1047019974166",
  appId: "1:1047019974166:web:6155f87a69400e5eb4cf37"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    NotificationManager.success("Welcome Google user!");
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    NotificationManager.success("Welcome!");
  } catch (err) {
    const errCode = err.code.toString();
    console.error(err);
    if (errCode === "auth/internal-error") NotificationManager.error("Password field is empty!");
    else if (errCode === "auth/invalid-email") NotificationManager.error("Email address format is wrong!");
    else if (errCode === "auth/user-not-found") NotificationManager.error("You are not registered. Please register!");
    else if (errCode === "auth/wrong-password") NotificationManager.error("The password you entered is wrong!");
    else NotificationManager.error("Unknown error");
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
