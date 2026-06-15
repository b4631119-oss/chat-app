"use client";
import { auth } from "../lib/auth";
import { signOut } from "firebase/auth";
import MessageList from "./MessageList";
import InputForm from "./InputForm";

export default function ChatInterface() {
  const user = auth.currentUser;

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 bg-white border-b flex justify-between items-center shadow-sm">
        <div className="font-bold text-xl text-blue-600">Dev-Chat</div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            {user?.email || "Пользователь"}
          </span>
          <button 
            onClick={() => signOut(auth)}
            className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 transition"
          >
            Выйти
          </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto">
        <MessageList />
      </div>
      
      <InputForm />
    </main>
  );
}