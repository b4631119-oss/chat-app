export function getAuthErrorMessage(error: unknown): string {
  const code = (error as { code?: string })?.code || "";

  const messages: Record<string, string> = {
    "auth/invalid-email": "Некорректный email",
    "auth/user-disabled": "Этот аккаунт отключён",
    "auth/user-not-found": "Пользователь с таким email не найден",
    "auth/wrong-password": "Неверный пароль",
    "auth/invalid-credential": "Неверный email или пароль",
    "auth/email-already-in-use": "Этот email уже зарегистрирован",
    "auth/weak-password": "Пароль слишком слабый, минимум 6 символов",
    "auth/too-many-requests": "Слишком много попыток. Попробуйте позже",
    "auth/network-request-failed": "Проблема с сетью. Проверьте подключение",
    "auth/popup-closed-by-user": "Окно входа было закрыто",
  };

  return messages[code] || "Произошла ошибка. Попробуйте снова";
}
