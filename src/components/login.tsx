"use client";
import { useState } from "react";
import { signInWithGoogle, registerWithEmail, loginWithEmail } from "../lib/auth";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Произошла неизвестная ошибка");
      }
    } finally {
      setSubmitting(false);
    }
  }; 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Вход" : "Регистрация"}
        </h1>

        <input 
          className="w-full border p-3 rounded-xl mb-3"
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <input 
          className="w-full border p-3 rounded-xl mb-6"
          type="password"
          placeholder="Пароль" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
        />
        
        <button 
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-3 rounded-xl mb-4 font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {submitting ? "..." : (isLogin ? "Войти" : "Зарегистрироваться")}
        </button>

        <div className="text-center mb-4 text-gray-400 text-sm">или</div>

        <button 
          onClick={signInWithGoogle}
          disabled={submitting}
          className="w-full bg-black text-white py-3 rounded-xl mb-6 hover:bg-gray-800 transition disabled:bg-gray-400"
        >
          Войти через Google
        </button>

        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            disabled={submitting}
            className="text-blue-600 font-bold hover:underline disabled:text-gray-400"
          >
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </div>
    </div>
  );
}