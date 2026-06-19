"use client";
import { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, onSnapshot, limit, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import MessageItem from "./MessageItem";
import { Message, ChatRoom } from "../types";

interface MessageListProps {
  chatId: ChatRoom;
}

export default function MessageList({ chatId }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    setMessages([]);
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      where("chatId", "==", chatId),
      limit(100)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, 'id'>),
      }));
      setMessages(msgs);
    }, (error) => {
      console.error("Ошибка подписки на сообщения:", error);
    });
    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => {
        const prevMsg = messages[index - 1];
        const hideAvatar = prevMsg && prevMsg.senderId === msg.senderId;
        
        return (
          <MessageItem 
            key={msg.id} 
            message={msg} 
            hideAvatar={hideAvatar} 
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
