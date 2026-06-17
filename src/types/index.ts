import { Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string; 
  createdAt: Timestamp;
}