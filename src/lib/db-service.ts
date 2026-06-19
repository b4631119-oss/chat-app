import { db } from "./firebase";
import { auth } from "./auth"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ChatRoom } from "../types";

export const sendMessage = async (text: string, senderName: string, chatId: ChatRoom, senderPhoto?: string) => {
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
    chatId: chatId,
    status: 'sent',
    createdAt: serverTimestamp(),
  });
  } catch (error) {
    console.error("Ошибка при отправке:", error);
  }
};