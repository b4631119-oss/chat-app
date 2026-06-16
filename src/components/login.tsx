"use client";
import { useState } from "react";
import { signInWithGoogle, registerWithEmail, loginWithEmail } from "../lib/auth";
import toast from "react-hot-toast";
import { getAuthErrorMessage } from "../lib/auth-errors";
import { Mail, Lock,  ArrowRight, User, Loader2 } from "lucide-react";

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
    return password.length >= 6;
  };

  const handleSubmit = async () => {
    // Валидация
    setEmailError("");
    setPasswordError("");
    
    if (!validateEmail(email)) {
      setEmailError("Введите корректный email");
      toast.error("Неверный формат email");
      return;
    }
    
    if (!validatePassword(password)) {
      setPasswordError("Пароль должен быть не менее 6 символов");
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
      {/* Декоративные элементы */}
      <div className="fixed top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md relative">
        {/* Карточка */}
        <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 transition-all duration-300 hover:shadow-3xl">
          {/* Логотип/Заголовок */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {isLogin ? "Добро пожаловать!" : "Создать аккаунт"}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              {isLogin ? "Войдите, чтобы продолжить общение" : "Присоединяйтесь к Dev-Chat"}
            </p>
          </div>

          {/* Форма */}
          <div className="space-y-4">
            {/* Email */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                className={`w-full pl-10 pr-4 py-3.5 border-2 rounded-xl text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm
                  ${emailError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}
                  focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed`}
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
              {emailError && (
                <p className="text-red-500 text-xs mt-1 ml-1">{emailError}</p>
              )}
            </div>

            {/* Пароль */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                className={`w-full pl-10 pr-12 py-3.5 border-2 rounded-xl text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm
                  ${passwordError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}
                  focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed`}
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
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1 ml-1">{passwordError}</p>
              )}
            </div>

            {/* Кнопка входа */}
            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  {isLogin ? "Войти" : "Зарегистрироваться"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Разделитель */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white/80 backdrop-blur-sm text-gray-400 font-medium">
                  ИЛИ
                </span>
              </div>
            </div>

            {/* Google */}
            <button 
              onClick={handleGoogleSignIn}
              disabled={submitting}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-medium transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-sm sm:text-base"
            >
              Войти через Google
            </button>
          </div>

          {/* Переключение */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setEmailError("");
                setPasswordError("");
              }}
              disabled={submitting}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? "Создать аккаунт" : "Войти"}
            </button>
          </p>

          {/* Дополнительная информация */}
          {!isLogin && (
            <p className="text-center text-xs text-gray-400 mt-4">
              Регистрируясь, вы соглашаетесь с условиями использования
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Добавьте эти компоненты для показа/скрытия пароля
const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOff = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);