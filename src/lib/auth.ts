import { auth } from "./firebase";
import { 
  GoogleAuthProvider, signInWithPopup, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword 
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const registerWithEmail = (email: string, password: string) => 
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email: string, password: string) => 
  signInWithEmailAndPassword(auth, email, password);

export { auth };