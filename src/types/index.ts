import { Timestamp } from "firebase/firestore";

export type ChatRoom = 'general' | 'flood' | 'help';

export const CHAT_ROOMS: Record<ChatRoom, string> = {
  general: 'Общий',
  flood: 'Флуд',
  help: 'Помощь',
};

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string; 
  chatId: ChatRoom;
  createdAt: Timestamp;
}