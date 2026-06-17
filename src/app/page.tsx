"use client";
import { useAuth } from "../context/AuthContext";
import Login from "../components/login"; 
import ChatInterface from "../components/ChatInterface";
import ProfileSetup from "../components/ProfileSetup"; 

export default function Home() {
  const { user, profileExists, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center">загрузка...</div>;
  
  if (!user) return <Login />; 
  if (!profileExists) return <ProfileSetup />; 
  return <ChatInterface />;
}