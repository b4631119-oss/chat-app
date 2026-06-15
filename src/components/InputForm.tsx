"use client";
import { useState, KeyboardEvent } from "react";
import { sendMessage } from "../lib/db-service";
import { useAuth } from "../context/AuthContext";

export default function InputForm() {
  const [text, setText] = useState("");
  const { userProfile } = useAuth();

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || !userProfile) return;
    await sendMessage(trimmed, userProfile.name);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown} 
        className="flex-1 border rounded-full px-4 py-2 outline-none focus:border-blue-500"
        placeholder="Напишите сообщение..."
        maxLength={1000}
      />
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Отправить
      </button>
    </div>
  );
}