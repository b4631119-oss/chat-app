"use client";
import { auth } from "../lib/auth";
import Image from "next/image";
import { Message } from "../types";

interface MessageItemProps {
  message: Message;
  hideAvatar: boolean;
}

export default function MessageItem({ message, hideAvatar }: MessageItemProps) {
  const isMine = message.senderId === auth.currentUser?.uid;
  const time = message.createdAt?.toDate 
    ? message.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "";

  return (
    <div className={`flex w-full items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
      {!isMine && (
        <div className="shrink-0 w-8 h-8 relative">
          {!hideAvatar && (
            <Image 
              src={ 'default-avatar.png'} 
              alt="avatar" 
              width={32} 
              height={32} 
              style={{ width: '32px', height: '32px' }}
              unoptimized
              className="rounded-full object-cover" 
            />
          )}
        </div>
      )}
      
      <div className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
        isMine ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border rounded-bl-none'
      }`}>
        {!isMine && !hideAvatar && (
          <div className="text-[11px] font-bold text-gray-500 mb-1">
            {message.senderName || "Гость"}
          </div>
        )}
        
        <p className="text-[16px] break-words">{message.text}</p>
        
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className={`text-[10px] opacity-70 ${isMine ? 'text-blue-100' : 'text-gray-400'}`}>
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}