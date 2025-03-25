export interface Event {
  id: number;
  title: string;
  type: 'mentorship' | 'meeting' | 'review';
  date: string;
  time: string;
  mentor?: string;
  reviewer?: string;
  participants?: string[];
  project?: string;
  topic?: string;
  icon: any; // TODO: Replace with proper icon type
}

export interface Deadline {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Conversation {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ProfileSettings {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  value: string;
}

export interface NotificationSetting {
  id: string;
  label: string;
  enabled: boolean;
}

export interface AccountSetting {
  id: string;
  label: string;
  enabled: boolean;
}

export interface UserPreferences {
  darkMode: boolean;
  language: string;
  emailNotifications: boolean;
  messageNotifications: boolean;
  courseUpdates: boolean;
  mentorMessages: boolean;
  twoFactorEnabled: boolean;
  sessionTimeout: boolean;
} 