"use client";
import { useState } from "react";
import { signInWithGoogle, registerWithEmail, loginWithEmail } from "../lib/auth";
import toast from "react-hot-toast";
import { getAuthErrorMessage } from "../lib/auth-errors";
import { ArrowRight, User, Loader2, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async () => {
    setEmailError("");
    setPasswordError("");
    
    if (!validateEmail(email)) {
      setEmailError("Введите корректный email");
      toast.error("Неверный формат email");
      return;
    }
    
    if (!validatePassword(password)) {
      setPasswordError("Пароль должен быть не менее 8 символов");
      toast.error("Пароль слишком короткий");
      return;
    }

    setSubmitting(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="fixed top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md relative">
        <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {isLogin ? "Добро пожаловать!" : "Создать аккаунт"}
            </h1>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input 
                className={`w-full pl-4 pr-4 py-3.5 border-2 rounded-xl text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm
                  ${emailError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}
                  focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50`}
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                onKeyDown={handleKeyDown}
                disabled={submitting}
              />
              {emailError && <p className="text-red-500 text-xs mt-1 ml-1">{emailError}</p>}
            </div>

            <div className="relative">
              <input 
                className={`w-full pl-4 pr-12 py-3.5 border-2 rounded-xl text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm
                  ${passwordError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}
                  focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50`}
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                onKeyDown={handleKeyDown}
                disabled={submitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={submitting}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {passwordError && <p className="text-red-500 text-xs mt-1 ml-1">{passwordError}</p>}
            </div>

            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{isLogin ? "Войти" : "Зарегистрироваться"} <ArrowRight className="w-4 h-4" /></>}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center text-xs"><span className="px-3 bg-white/80 text-gray-400 font-medium">ИЛИ</span></div>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              disabled={submitting}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-medium border-2 border-gray-200 transition-all disabled:opacity-50"
            >
              Войти через Google
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setEmailError("");
                setPasswordError("");
              }}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isLogin ? "Создать аккаунт" : "Войти"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}