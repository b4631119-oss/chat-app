"use client";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

export default function ProfileSetup() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const saveProfile = async () => {
    if (!user || !name.trim()) {
      alert("Пожалуйста, введите ваше имя");
      return;
    }
    
    setLoading(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Ошибка при сохранении профиля:", error);
      alert("Не удалось сохранить профиль");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6">Как вас называть?</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Это имя увидят другие пользователи в чате.
        </p>
        
        <input 
          className="w-full border p-3 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Введите имя..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <button 
          onClick={saveProfile} 
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-white transition ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Сохранение..." : "Начать общение"}
        </button>
      </div>
    </div>
  );
}