"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth } from "../lib/auth"; 
import { db } from "../lib/firebase";

export interface UserProfile {
  name: string;
  email: string;
  createdAt: any;
}

const AuthContext = createContext<{ 
  user: User | null; 
  userProfile: UserProfile | null;
  profileExists: boolean | null;
  loading: boolean;
}>({ 
  user: null, 
  userProfile: null,
  profileExists: null,
  loading: true 
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        unsubscribeProfile = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
            setProfileExists(true);
          } else {
            setUserProfile(null);
            setProfileExists(false);
          }
          setLoading(false);
        }, (error) => {
          console.error("Ошибка при получении профиля:", error);
          setUserProfile(null);
          setProfileExists(false);
          setLoading(false);
        });
      } else {
        setUserProfile(null);
        setProfileExists(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, profileExists, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);