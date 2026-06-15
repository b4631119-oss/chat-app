import { db } from "./firebase";
import { auth } from "./auth"; // Импортируем auth
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const sendMessage = async (text: string, senderName: string, senderPhoto?: string) => {
  const user = auth.currentUser;
  
  if (!user) {
    console.error("Пользователь не авторизован");
    return;
  }

  try {
   await addDoc(collection(db, "messages"), {
    text,
    senderId: user.uid,
    senderName: senderName,
    senderPhoto: senderPhoto || "",
    status: 'sent',
    createdAt: serverTimestamp(),
  });
  } catch (error) {
    console.error("Ошибка при отправке:", error);
  }
};