import type { LucideIcon } from 'lucide-react';

export type Skill = {
  id: string;
  name: string;
  icon: string; // name of lucide-react icon
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  points: number;
  avatar: string;
  skillsOffered: string[]; // array of skill IDs
  skillsWanted: string[]; // array of skill IDs
  badges: string[]; // array of badge IDs
};

export type Session = {
  id: number;
  teacherId: number;
  learnerId: number;
  skillId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  mode: 'in-person' | 'online';
};

export type Review = {
  id: number;
  sessionId: number;
  reviewerId: number;
  revieweeId: number;
  stars: number;
  feedback: string;
};

export type Message = {
  id: number;
  conversationId: number;
  senderId: number;
  text: string;
  timestamp: string;
  read: boolean;
};

export type Conversation = {
  id: number;
  participantIds: number[];
  lastMessage: Message;
};
